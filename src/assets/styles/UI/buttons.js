import styled from 'styled-components';
import { colors, spacing, fontSizing } from '../Variables/variables';

const buttonStyle = `
  display: block;
  padding: ${spacing.xxsmall} ${spacing.small};

  color: ${colors.white};
  font-size: ${fontSizing.label};
  font-weight: bold;
  text-transform: capitalize;

  background-color: ${colors.blue};

  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    color: ${colors.blue};
    background-color: ${colors.white};
    border: 1px solid ${colors.blue};
  }

  &:focus {
    outline: none;
  }

  &.margin-bottom {
    margin-bottom: ${spacing.xsmall};
  }

  &.margin-top {
    margin-top: ${spacing.xsmall};
  }
`;

export const UIButton = styled.button`
  ${buttonStyle}
`;

export const UISubmit = styled.input`
  &[type="submit"] {
    ${buttonStyle}
  }
`;

export const SidebarButton = styled.button`
  display: block;
  width: 100%;

  padding: ${spacing.xsmall} 0 ${spacing.xsmall} ${spacing.small};

  background-color: transparent;
  border: none;
  border-radius: none;

  color: ${colors.white};
  font-size: ${fontSizing.label};
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