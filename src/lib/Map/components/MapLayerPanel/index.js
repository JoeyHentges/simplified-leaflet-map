import React from 'react';
import { Container, MobileHeader, LayersContainer, Title, ButtonsContainer, Button } from './styles/MapLayerPanel';

export default function MapLayerPanel({ active, styling, children, ...restProps }) {
  return <Container active={active} styling={styling} {...restProps}>{children}</Container>;
}

MapLayerPanel.MobileHeader = function MapLayerPanelMobileHeader({ children, ...restProps }) {
  return <MobileHeader {...restProps}>{children}</MobileHeader>;
};

MapLayerPanel.LayersContainer = function MapLayerPanelLayersContainer({ children, ...restProps }) {
  return <LayersContainer {...restProps}>{children}</LayersContainer>;
};

MapLayerPanel.Title = function MapLayerPanelTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

MapLayerPanel.ButtonsContainer = function MapLayerPanelButtonsContainer({ children, ...restProps }) {
  return <ButtonsContainer {...restProps}>{children}</ButtonsContainer>;
};

MapLayerPanel.Button = function MapLayerPanelButton({ active, styling, children, ...restProps }) {
  return <Button active={active} styling={styling} {...restProps}>{children}</Button>;
};
