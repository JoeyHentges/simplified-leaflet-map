import React from 'react';
import "leaflet/dist/leaflet.css";
import { TileLayer, ZoomControl } from "react-leaflet";
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';

import { Container, MainContainer, FullScreenButton } from './styles/Map';

export default function Map(props) {
  const {
    tileLayerUrl,
    zoom,
    maxZoom,
    minZoom,
    maxBounds,
    whenCreated,
    fullScreen,
    onFullScreenButtonClicked,
    styling
  } = props;

  // Get the center of the map using the provided bounds
  const getMapCenter = () => [(maxBounds[0][0] + maxBounds[1][0]) / 2, (maxBounds[0][1] + maxBounds[1][1]) / 2];

  return (
    <MainContainer fullScreen={fullScreen}>
      <Container
        className="map-container"
        center={getMapCenter()}
        zoom={zoom}
        maxZoom={maxZoom}
        minZoom={minZoom}
        maxBounds={maxBounds}
        zoomControl={false}
        whenCreated={whenCreated}
        styling={styling}
      >
        <TileLayer
          url={tileLayerUrl}
        />
        <ZoomControl position="bottomright" />
        <FullScreenButton onClick={onFullScreenButtonClicked}>{fullScreen ? <BsFullscreenExit /> : <BsFullscreen />}</FullScreenButton>
      </Container>
    </MainContainer>
  );
}
