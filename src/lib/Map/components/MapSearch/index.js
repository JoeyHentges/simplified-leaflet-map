import React from 'react';
import { Container, InputContainer, Input, ResultsContainer, ResultItem } from './styles/MapSearch';

export default function MapSearch({ styling, children, ...restProps }) {
  return <Container styling={styling} {...restProps}>{children}</Container>;
}

MapSearch.InputContainer = function MapSearchInputContainer({ children, ...restProps }) {
  return <InputContainer {...restProps}>{children}</InputContainer>;
};

MapSearch.Input = function MapSearchInput({ ...restProps }) {
  return <Input {...restProps} />;
};

MapSearch.ResultsContainer = function MapSearchResultsContainer({ children, ...restProps }) {
  return <ResultsContainer {...restProps}>{children}</ResultsContainer>;
};

MapSearch.ResultItem = function MapSearchResultItem({ children, ...restProps }) {
  return <ResultItem {...restProps}>{children}</ResultItem>;
};

