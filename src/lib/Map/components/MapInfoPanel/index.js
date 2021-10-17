import React from 'react';
import { Container, TitleContainer, Title, BodyContainer, ContentContainer, FooterContainer } from './styles/MapInfoPanel';

export default function MapInfoPanel({ active, styling, children, ...restProps }) {
  return <Container active={active} styling={styling} {...restProps}>{children}</Container>;
}

MapInfoPanel.TitleContainer = function MapInfoPanelTitleContainer({ children, ...restProps }) {
  return <TitleContainer {...restProps}>{children}</TitleContainer>;
};

MapInfoPanel.Title = function MapInfoPanelTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

MapInfoPanel.BodyContainer = function MapInfoPanelBodyContainer({ children, ...restProps }) {
  return <BodyContainer {...restProps}>{children}</BodyContainer>;
};

MapInfoPanel.ContentContainer = function MapInfoPanelContentContainer({ children, ...restProps }) {
  return <ContentContainer {...restProps}>{children}</ContentContainer>;
};

MapInfoPanel.FooterContainer = function MapInfoPanelFooterContainer({ children, ...restProps }) {
  return <FooterContainer {...restProps}>{children}</FooterContainer>;
};