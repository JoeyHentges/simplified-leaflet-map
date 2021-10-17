import React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import { Map } from './lib';

import mapData from './__mock__/map-data.json';
import mapContent from './__mock__/map-content.json';

export const GlobalStyles = createGlobalStyle`
  html, body {
    font-family: AdelleSans,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    margin: 0px;
    overflow: hidden;
  }
`;

function Init() {
  return (
    <div style={{ height: '100vh' }}>
      <GlobalStyles />
      <Map
        content={mapContent}
        mapData={mapData}
        tileLayerUrl='/map-tiles/{z}/{x}/{y}.png'
        zoom={4}
        maxZoom={6}
        minZoom={4}
        maxBounds={[[100, -180.1], [41.4, 60.6]]}
        mapFullScreen={false}
      />
    </div>
  );
}

render(<Init />, document.getElementById('root'));

/*
OSRS Map Props
      tileLayerUrl='/map-tiles/{z}/{x}/{y}.png'
      zoom={4}
      maxZoom={6}
      minZoom={4}
      maxBounds={[[100, -180.1], [41.4, 60.6]]}
*/

/*
Game of Thrones Map Props
      tileLayerUrl='https://cartocdn-gusc.global.ssl.fastly.net/ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png'
      zoom={4}
      maxZoom={8}
      minZoom={4}
      maxBounds={[[50, -30], [-45, 100]]}
*/
