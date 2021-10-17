import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  text-transform: uppercase;
`;

export const Button = styled.div`
  color: ${({ active, styling: { layerPanel } }) => (active ? layerPanel.layerActiveTextColor : layerPanel.layerTextColor)};
  border-top: ${({ styling: { layerPanel } }) => layerPanel.layerBorder};
  padding: 6px;
  cursor: pointer;
  user-select: none;
  font-family: ${({ styling: { layerPanel } }) => layerPanel.font};
`;

export const Container = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  padding: 12px;
  border-radius: 4px;
  background: ${({ styling: { layerPanel } }) => layerPanel.backgroundColor};
  z-index: 1000;
  color: ${({ styling: { layerPanel } }) => layerPanel.textColor};

  ${ButtonsContainer} {
    :last-child {
      border-bottom: ${({ styling: { layerPanel } }) => layerPanel.layerBorder};
    }
  }

  @media only screen and (max-width: 660px) {
    border-radius: 0px;
    display: inline-flex;
    align-items: center;
    top: 15%;
    right: 0;
    transition: all 0.3s ease-in-out;
    transform: ${({ active }) => (active ? 'translateX(0)' : 'translateX(calc(100% - 40px))')};
  }
`;

export const MobileHeader = styled.div`
  display: none;

  @media only screen and (max-width: 660px) {
    cursor: pointer;
    display: block;
    width: 40px;
    transform: translateY(120%) rotate(-90deg);
    padding: 10px;
    margin-left: -20px;
    letter-spacing: 1rem;
    text-transform: uppercase;
  }
`;

export const LayersContainer = styled.div``;

export const Title = styled.h3`
  text-align: center;
  text-transform: uppercase;
  margin: 0 auto;
`;