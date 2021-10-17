import styled from 'styled-components';
import { MapContainer } from "react-leaflet";

export const FullScreenButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 0;
  margin-right: 60px;
  width: 30px;
  height: 30px;
  padding-left: 5px;
  padding-top: 5px;
  line-height: 30px;
  z-index: 1000;
  border: none;
  font: 19px 'Lucida Console', Monaco, monospace;
  text-indent: 1px;
  border-radius: 2px;
  cursor: pointer;
`

export const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  
  .leaflet-bottom {
    @media only screen and (max-width: 660px) {
      bottom: ${({ fullScreen }) => (fullScreen ? '0px' : '90px')};
    }
  }
  
  ${FullScreenButton} { 
    @media only screen and (max-width: 660px) {
      bottom: ${({ fullScreen }) => (fullScreen ? '10px' : '100px')};
    }
  }
`;

export const Container = styled(MapContainer)`
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
  background: ${({ styling: { backgroundColor } }) => backgroundColor};

  .leaflet-container {
    background: red;
  }

  .leaflet-popup {
    bottom: 0;
  }

  .leaflet-popup-content {
    user-select: none;
    cursor: pointer;
  }

  .leaflet-popup-close-button {
    display: none;
  }

  .leaflet-popup-content-wrapper, .leaflet-popup-tip {
    background: ${({ styling: { marker } }) => marker.popupBackgroundColor};
    color: ${({ styling: { marker } }) => marker.popupTextColor};
    text-align: center;
  }

  .leaflet-control-zoom {
    border: none;
  }

  .leaflet-control-zoom-in, .leaflet-control-zoom-out {
    background: ${({ styling: { zoomControl } }) => zoomControl.backgroundColor};
    color: ${({ styling: { zoomControl } }) => zoomControl.iconColor};
    border: none;

    &:hover {
      background: ${({ styling: { zoomControl } }) => zoomControl.backgroundHoverColor};
      color: ${({ styling: { zoomControl } }) => zoomControl.iconHoverColor};
    }
  }

  .leaflet-control-zoom-in.leaflet-disabled, .leaflet-control-zoom-out.leaflet-disabled {
    background: ${({ styling: { zoomControl } }) => zoomControl.backgroundHoverColor};
    color: ${({ styling: { zoomControl } }) => zoomControl.iconDisabledColor};

    &:hover {
      color: ${({ styling: { zoomControl } }) => zoomControl.iconDisabledColor};
    }
  }

  .leaflet-control-attribution {
    display: none;
  }

  .map-label {
    div {
      font-family: ${({ styling: { label } }) => label.font};
      font-weight: bold;
      text-align: center;
    }
  }

  ${FullScreenButton} {
    background: ${({ styling: { zoomControl } }) => zoomControl.backgroundColor};
    color: ${({ styling: { zoomControl } }) => zoomControl.iconColor};

    &:hover {
      background: ${({ styling: { zoomControl } }) => zoomControl.backgroundHoverColor};
      color: ${({ styling: { zoomControl } }) => zoomControl.iconHoverColor};
    }
  }
`;
