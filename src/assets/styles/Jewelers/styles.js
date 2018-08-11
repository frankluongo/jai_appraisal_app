import styled from 'styled-components';
import { colors, spacing } from '../Variables/variables';


export const JewelerListItem = styled.div`
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

export const NewJewelerFormWrapper = styled.div`
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