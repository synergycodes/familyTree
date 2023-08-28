import * as go from 'gojs';

import { theme } from '../../../theme';

const $ = go.GraphObject.make;

export const counterMainShape = (props: Partial<go.Shape> = {}) =>
  $(go.Shape, 'Circle', {
    desiredSize: new go.Size(29, 29),
    fill: theme.colors.counterBackground,
    portId: '',
    stroke: theme.colors.counterBorder,
    fromSpot: go.Spot.Bottom,
    strokeWidth: 2,
    ...props,
  });
