import React, { useEffect, useState, useRef } from 'react';
import ReactDOMServer from 'react-dom/server'
import Leaflet from 'leaflet';
import "leaflet/dist/leaflet.css";

import { Map, MapInfoPanel, MapLayerPanel, MapSearch } from './components';
import { usePreviousState } from './hooks';

function MapContainer({
  content,
  mapData,
  tileLayerUrl,
  zoom,
  maxZoom,
  minZoom,
  maxBounds,
  mapFullScreen
}) {
  const { markerIcons, styling } = content;
  // Map Full Screen State - remove all extra panels
  const [fullScreen, setFullScreen] = useState(false);
  // Map State
  const [map, setMap] = useState(null);
  // Map Search State
  const [searchValue, setSearchValue] = useState('');
  const [mapSearchOptions, setMapSearchOptions] = useState([]);
  const [mapSearchResults, setMapSearchResults] = useState([]);
  // Map Layers State
  const [mobileLayerActive, setMobileLayerActive] = useState(false);
  const [mapLayers, setMapLayers] = useState([]);
  const mapLayersRef = useRef();
  const [activeLayerItem, setActiveLayerItem] = useState(null);
  const lastActiveLayerItem = usePreviousState(activeLayerItem);
  // Info Panel State
  const [infoPanelActive, setInfoPanelActive] = useState(false);

  // add a reference to the mapLayers variable -- needed for zoom handling
  useEffect(() => {
    mapLayersRef.current = mapLayers;
  }, [mapLayers])

  // handle map setup - zoom level events
  const setupMap = (map) => {
    // setup zoom levels - show layers when zoomed in to a certain level
    map.on('zoomend', () => {
      const zoomLevel = map.getZoom();
      Object.entries(mapLayersRef.current).forEach((layerGroup) => {
        Object.entries(layerGroup[1].layers).forEach((layer) => {
          if (layer[0] <= zoomLevel && layerGroup[1].active) {
            layer[1].addTo(map);
          } else {
            layer[1].removeFrom(map);
          }
        });
      })
    });
    /*
    Enable this section to find the coordinates of a point.

    map.on('click', (event) => {
      console.log(event.latlng);
    })
    */
    setMap(map);
  }

  const onSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    if (value !== '') {
      const results = mapSearchOptions.filter((option) => option.title.toUpperCase().includes(value.toUpperCase()));
      setMapSearchResults(results.slice(0, 10));
    } else {
      setMapSearchResults([]);
    }
  }

  const searchResultOnClick = (result) => {
    const { mapLayer, geometry, layer, properties } = result;
    const { type, coordinates } = geometry;
    const { zoomLevel } = properties;

    // close any popups of currently active layer item
    if (activeLayerItem?.geometry.type === 'Point') {
      activeLayerItem.mapLayer.closePopup();
    }

    enableLayer(layer);
    if (type === 'Polygon') {
      map.flyToBounds(mapLayer.getBounds(), { maxZoom: zoomLevel });
    } else if (type === 'Point') {
      // enable the layer of that item - add it to the map (need to do it this way to show the popup...)
      mapLayersRef.current[layer].layers[zoomLevel].addTo(map);
      map.flyTo(coordinates, zoomLevel);
      mapLayer.openPopup();
    } else {
      map.flyTo(coordinates, zoomLevel);
    }
    setActiveLayerItem(result);
    setSearchValue('');
    setMapSearchResults([]);
  }

  /*
    Enable a layer and display the layer items.
  */
  const enableLayer = (layerTitle) => {
    let newMapLayerState = mapLayers;
    newMapLayerState[layerTitle].active = true;
    setMapLayers({ ...newMapLayerState });
  }

  /*
    When a layer in the layers tab is clicked,
    update the active status to its opposite, and then
    activate/deactivate all elements related to that layer.
  */
  const handleLayerClick = (clickedLayer) => {
    const newMapLayerState = mapLayers;
    newMapLayerState[clickedLayer.title].active = !mapLayers[clickedLayer.title].active;
    const zoomLevel = map.getZoom();
    Object.entries(clickedLayer.layers).forEach((layer) => {
      if (mapLayers[clickedLayer.title].active) {
        // add map layer if zoom level is >= to its allowed zoom level
        if (zoomLevel >= layer[0]) {
          layer[1].addTo(map);
        }
      } else {
        // remove map layer
        layer[1].removeFrom(map);
      }
    })

    setMapLayers({ ...newMapLayerState });
  }

  // The event handler for the markers / geojsons on the map
  const layerEventHandler = {
    click: (event) => {
      const { value } = event.target.options;
      setActiveLayerItem({ ...value, mapLayer: event.target });
    }
  }

  // handle geojson color changing on layer clicks
  useEffect(() => {
    if (activeLayerItem !== lastActiveLayerItem) {
      if (activeLayerItem && activeLayerItem.geometry.type === 'Polygon') {
        activeLayerItem.mapLayer.setStyle({ color: styling.geoJson.activeColor });
      }
      if (lastActiveLayerItem && lastActiveLayerItem.geometry.type === 'Polygon') {
        lastActiveLayerItem.mapLayer.setStyle({ color: styling.geoJson.color });
      }
    }
  }, [activeLayerItem, lastActiveLayerItem, styling.geoJson.color, styling.geoJson.activeColor]);

  /*
    Add all of the layer groups to the map from the map data props.
    Loop over all of the items and group them into their respective layers.
    Then set the state for the layer groups and the search options.
  */
  const addLayerGroups = () => {
    // get an object containing all of the layer items
    let layerGroups = {};
    const layerItems = []; // for the search options
    mapData.forEach((data) => {
      const { title, layer, geometry, properties } = data;
      const { type, coordinates } = geometry;
      let layerItem;
      if (type === 'Polygon') {
        layerItem = Leaflet.geoJSON(data, { value: data }).setStyle({ weight: styling.geoJson.lineWeight, opacity: styling.geoJson.opacity, color: styling.geoJson.color }).addEventListener(layerEventHandler);
      } else if (type === 'Label') {
        layerItem = Leaflet.marker(coordinates, {
          value: data,
          icon: Leaflet.divIcon({
            className: 'map-label',
            html: ReactDOMServer.renderToString(
              <div style={properties.styling}>
                {properties.labelText}
              </div>
            )
          })
        })
        //layerItem = Leaflet.popup({ value: data, closeOnClick: false, autoClose: false, className: "map-label" }).setLatLng(coordinates).setContent(`<div style="font-size: ${fontSize}; color: ${fontColor}">${title}</>`);
      } else {
        layerItem = Leaflet.marker(
          coordinates, {
          value: data,
          icon: Leaflet.icon({
            iconUrl: markerIcons[layer],
            iconSize: styling.marker.iconSize
          })
        })
          .bindPopup(title)
          .addEventListener(layerEventHandler);
      }

      // if there does not exist a layer group for the item's layer - add one to the layerGroups object
      if (!layerGroups[layer]) {
        layerGroups[layer] = { layerItems: {} };
      }

      if (!layerGroups[layer].layerItems[properties.zoomLevel]) {
        layerGroups[layer].layerItems[properties.zoomLevel] = [];
      }
      layerGroups[layer].layerItems[properties.zoomLevel].push(layerItem);
      layerItems.push({ ...data, mapLayer: layerItem });
    });
    // create layer groups and add them to the layers array
    const mapLayersData = {};
    Object.entries(layerGroups).forEach((group) => {
      const { layerItems } = group[1];
      let layers = {};
      Object.entries(layerItems).forEach((layerItem) => layers[layerItem[0]] = Leaflet.layerGroup(layerItem[1]));
      mapLayersData[group[0]] = {
        title: group[0],
        active: false,
        layers
      };
    });
    setMapLayers(mapLayersData);
    setMapSearchOptions(layerItems);
  }

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <Map
        tileLayerUrl={tileLayerUrl}
        zoom={zoom}
        maxZoom={maxZoom}
        minZoom={minZoom}
        maxBounds={maxBounds}
        whenCreated={(map) => {
          setupMap(map);
          addLayerGroups();
        }}
        fullScreen={fullScreen}
        onFullScreenButtonClicked={() => setFullScreen(!fullScreen)}
        styling={styling}
      />

      {(!fullScreen && !mapFullScreen) && (
        <>
          <MapSearch styling={{ searchBar: styling.searchBar }}>
            <MapSearch.InputContainer>
              <MapSearch.Input
                type="text"
                placeholder="Search..."
                name="new-password"
                autocomplete="new-password"
                value={searchValue}
                onChange={onSearchChange}
              />
            </MapSearch.InputContainer>
            <MapSearch.ResultsContainer>
              {mapSearchResults.map((result) => (
                <MapSearch.ResultItem
                  key={result.title}
                  value={result}
                  onClick={() => searchResultOnClick(result)}
                >
                  {result.title}
                </MapSearch.ResultItem>
              ))}
            </MapSearch.ResultsContainer>
          </MapSearch>

          <MapLayerPanel active={mobileLayerActive} styling={styling}>
            <MapLayerPanel.MobileHeader onClick={() => setMobileLayerActive(!mobileLayerActive)}>Layers</MapLayerPanel.MobileHeader>
            <MapLayerPanel.LayersContainer>
              <MapLayerPanel.Title>
                Layers
              </MapLayerPanel.Title>
              <MapLayerPanel.ButtonsContainer>
                {Object.entries(mapLayers).map((layer) => (
                  <MapLayerPanel.Button
                    key={layer[0]}
                    active={layer[1].active}
                    value={layer[1]}
                    onClick={() => handleLayerClick({ ...layer[1] })}
                    styling={styling}
                  >
                    {layer[0]}
                  </MapLayerPanel.Button>
                ))}
              </MapLayerPanel.ButtonsContainer>
            </MapLayerPanel.LayersContainer>
          </MapLayerPanel>

          <MapInfoPanel
            active={infoPanelActive}
            onClick={() => setInfoPanelActive(!infoPanelActive)}
            styling={styling}
          >
            <MapInfoPanel.TitleContainer>
              <MapInfoPanel.Title>
                {activeLayerItem ? activeLayerItem.title : styling.infoPanel.initialTitleText}
              </MapInfoPanel.Title>
            </MapInfoPanel.TitleContainer>
            <MapInfoPanel.BodyContainer>
              {activeLayerItem && (
                <MapInfoPanel.ContentContainer>
                  <h3>{activeLayerItem.properties.type.toUpperCase()}</h3>
                  {activeLayerItem.properties.list.map((item) => <div key={item}>{item}</div>)}
                  <h3>Summary</h3>
                  <div>{activeLayerItem.properties.summary}</div>
                </MapInfoPanel.ContentContainer>
              )}
              <MapInfoPanel.FooterContainer>
                <p>hi</p>
              </MapInfoPanel.FooterContainer>
            </MapInfoPanel.BodyContainer>
          </MapInfoPanel>
        </>
      )}
    </div>
  );
}

export default MapContainer;
