import styled from 'styled-components';
import { colors, spacing } from '../Variables/variables';

const innerScroll = `
  height: calc(100vh - 60px);
  padding-bottom: 30px;
  overflow: scroll;
`;

export const Header = styled.header`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;

  padding-top: 5px;
  height: 23px;
  width: 100%;

  background-color: transparent;

  color: ${colors.grayDark};
  font-size: 0.75rem;
  text-align: center;

  -webkit-app-region: drag;
`;

export const AppWrapper = styled.div`
  background-color: ${colors.white};
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-gap: 0;
  grid-template-columns: 240px 1fr;

  height: 100vh;

`;

export const PageWrapper = styled.div`
  overflow: hidden;
  padding: ${spacing.small};
  padding-top: 53px;

  background-color: ${colors.white};
`;

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 480px) minmax(auto, 700px);

  &.small-aside {
    grid-template-columns: minmax(auto, 320px) 1fr;
  }

  height: 100vh;
`;

export const AsideContent = styled.div`
  ${innerScroll}
`;

export const AsideListItem = styled.div`
  display: grid;
  align-items: center;

  width: 100%;

  padding: ${spacing.xsmall} 0;
  padding-left: ${spacing.xxsmall};

  border-bottom: 1px solid ${colors.grayLight};
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    border-left: 5px solid ${colors.blue};
  }

  ${({active}) => active && `
    border-left: 5px solid ${colors.blue};
  `};
`;

export const MainContent = styled.div`
  ${innerScroll}

  padding: 0 ${spacing.small};
`;

export const Sidebar = styled.div`
  height: 100%;
  padding: 53px ${spacing.small} ${spacing.small} 0;

  background-color: ${colors.black};
`;

export const SidebarElement = styled.button`
  display: block;
  width: 100%;

  padding: ${spacing.xsmall} 0 ${spacing.xsmall} ${spacing.small};

  background-color: transparent;
  border: none;
  border-radius: none;

  color: ${colors.white};
  font-size: 0.875rem;
  font-weight: bold;
  text-align: left;

  cursor: pointer;
  transition: all 0.15s ease-in-out;
  -webkit-appearance: none;

  &:hover {
    border-left: 5px solid ${colors.blue};
  }

  &:focus {
    outline: none;
  }

  ${({active}) => active && `
    border-left: 5px solid ${colors.blue};
  `};
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background-color: rgba(0,0,0,0.5);

  form {
    z-index: 9;
    position: absolute;
    top: 50%;
    left: 50%;

    width: 80%;
    max-width: 720px;

    padding: ${spacing.small};

    background-color: ${colors.white};

    transform: translate(-50%, -50%);
  }
`;