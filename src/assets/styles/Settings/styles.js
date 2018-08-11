import styled from 'styled-components';
import { colors, fontSizing } from '../Variables/variables';

export const PreviewElement = styled.div`
  position: relative;

  border: 1px solid #eee;
  padding: 5%;
`;

export const PreviewElementImage = styled.img`
  position: absolute;
  top: 5%;

  display: block;
  max-width: 90%;
`;

export const PreviewText = styled.div`
  position: absolute;
  bottom: 5%;
  width: 90%;

  color: ${colors.grayDark}
  font-size: ${fontSizing.preview};
  line-height: 1.5;
  text-align: center;
`;