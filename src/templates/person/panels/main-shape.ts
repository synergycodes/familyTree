import * as go from 'gojs';

import { CORNER_ROUNDNESS, MAIN_SHAPE_NAME, STROKE_WIDTH } from '../settings';
import { theme } from '../../../theme';
import { statusStrokeBinding, highlightStrokeBinding } from './common-bindings';

const $ = go.GraphObject.make;

export const personMainShape = (props: Partial<go.Shape> = {}) =>
  $(
    go.Shape,
    {
      figure: 'RoundedRectangle',
      desiredSize: new go.Size(215, 110),
      name: MAIN_SHAPE_NAME,
      fill: theme.colors.personNodeBackground,
      portId: '',
      fromSpot: go.Spot.BottomSide,
      toSpot: go.Spot.Top,
      parameter1: CORNER_ROUNDNESS,
      strokeWidth: STROKE_WIDTH,
      ...props,
    },
    statusStrokeBinding(),
    highlightStrokeBinding(),
  );
