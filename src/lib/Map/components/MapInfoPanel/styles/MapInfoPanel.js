import styled from 'styled-components';

export const TitleContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

export const ContentContainer = styled.div`
  padding: 0 8% 24px 8%;
  margin: 0 auto;
  max-height: 30vh;
  overflow-y: auto;
  font-size: 1rem;
  line-height: 1.25em;
  font-weight: 300;

  @media only screen and (max-width: 660px) {
    max-height: 50vh;
  }
`;

export const Container = styled.div`
  position: absolute;
  overflow-y: hidden;
  bottom: 0;
  left: 24px;
  z-index: 1000;
  background: ${({ styling: { infoPanel } }) => infoPanel.backgroundColor};
  width: 500px;
  color: ${({ styling: { infoPanel } }) => infoPanel.textColor};
  transition: all 0.4s ease-in-out;
  transform: ${({ active }) => (active ? 'translateY(0)' : 'translateY(calc(100% - 80px))')};

  @media only screen and (max-width: 660px) {
    left: 0;
    width: 100%;
  }

  ${TitleContainer} {
    font-family: ${({ styling: { infoPanel } }) => infoPanel.titleFont};
  }

  ${ContentContainer} {
    background: ${({ styling: { infoPanel } }) => infoPanel.contentBackgroundColor};

    :-webkit-scrollbar-track {
      background-color: ${({ styling: { infoPanel } }) => infoPanel.scrollbarBackgroundColor};
    } ::-webkit-scrollbar {
        width: 6px;
        background-color: ${({ styling: { infoPanel } }) => infoPanel.scrollbarBackgroundColor};
      } ::-webkit-scrollbar-thumb {
          background-color: ${({ styling: { infoPanel } }) => infoPanel.scrollbarColor};
        }
  }
`;

export const Title = styled.h1`
  letter-spacing: 0.3rem;
  max-width: 100%;
  padding: 20px;
  text-overflow: ellipsis;
  text-align: center;
`;

export const BodyContainer = styled.div`
  margin-top: 80px;
  overflow-x: hidden;
  position: relative;
  height: 80%;
`;

export const FooterContainer = styled.div`
  font-size: 0.8rem;
  padding: 10px;
  text-align: center;
  text-transform: uppercase;
`;
