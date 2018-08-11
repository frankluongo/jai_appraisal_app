import styled from 'styled-components';
import { colors, spacing, fontSizing } from '../Variables/variables';

export const UIForm = styled.form`
  padding-bottom: ${spacing.xsmall};
`;

export const UIUploadForm = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;

  margin: ${spacing.small} 0;
  padding: ${spacing.xsmall} 0;

  background-color: ${colors.grayLight};
  border: 1px solid ${colors.grayMedium};

`;

export const UIUploadButtonWrapper = styled.div`
  justify-self: left;
  margin-left: ${spacing.xsmall};
`;
export const UIUploadLabel = styled.label`
  display: block;
  margin-bottom: ${spacing.xxsmall};

  font-size: ${fontSizing.label};
`;


export const UIUploadImageWrapper = styled.div`
  padding: 0 ${spacing.xsmall};
`;

export const UIUploadImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100px;
`;

export const UIInput = styled.input`

  &[type="text"] {
    display: block;
    width: 100%;

    padding: ${spacing.xsmall} 0;
    padding-left: ${spacing.xsmall};

    color: ${colors.grayDark};
    font-size: ${fontSizing.label};

    background-color: ${colors.grayLight};
    border: 1px solid ${colors.grayMedium};

    &.margin-bottom {
      margin-bottom: ${spacing.xsmall};
    }

    &.condensed {
      padding: ${spacing.xxsmall} 0;
      padding-left: ${spacing.xsmall};
    }
  }

`;

export const UILabel = styled.label`
  display: block;

  margin-bottom: ${spacing.xxsmall};

  font-size: ${fontSizing.label};
`;