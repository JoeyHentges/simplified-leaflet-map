import styled from 'styled-components';

export const Input = styled.input`
  height: 50px;
  border-radius: 4px;
  font-size: 1rem;
  padding: 4px;
  background-image: url('https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_search_white_18px.svg');
  background-position: 17px 17px;
  background-size: 24px 24px;
  background-repeat: no-repeat;
  padding-left: 50px;

  @media only screen and (max-width: 660px) {
    border-radius: 0;
  }
`;

export const InputContainer = styled.div`
  height: 50px;
`;

export const ResultsContainer = styled.div`
  margin-top: 18px;
  border-radius: 4px;

  @media only screen and (max-width: 660px) {
    margin-top: 0;
    border-radius: 0;
  }
`;

export const ResultItem = styled.div`
  padding: 16px;
  cursor: pointer;
`;


export const Container = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  background: transparent;
  z-index: 1000;
  color: ${({ styling: { searchBar } }) => searchBar.textColor};
  box-sizing: border-box;

  @media only screen and (max-width: 660px) {
    width: 100%;
    top: 0;
    left: 0;
  }

  ${Input} {
    background-color: ${({ styling: { searchBar } }) => searchBar.backgroundColor};
    color: ${({ styling: { searchBar } }) => searchBar.textColor};
    border: ${({ styling: { searchBar } }) => searchBar.border};
    width: 0px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
    cursor: pointer;

    &:focus {
      width: 350px;
      outline: none;
      cursor: text;

      @media only screen and (max-width: 660px) {
        width: 100%;
      }
    }
  }

  ${ResultsContainer} {
    background: ${({ styling: { searchBar } }) => searchBar.resultBackgroundColor};
  }

  ${ResultItem} {
    &:hover {
      background: ${({ styling: { searchBar } }) => searchBar.resultHoverBackgroundColor};
    }
  }
`;