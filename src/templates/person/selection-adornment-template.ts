import * as go from 'gojs';

import { ADORNMENT_STROKE_WIDTH, IMAGE_TOP_MARGIN } from './settings';
import { theme } from '../../theme';
import { personImage } from './panels/image';

const $ = go.GraphObject.make;

// ensure that selection adornment has always the same shape as the node it adorns
const cloneGeometryBinding = () =>
  new go.Binding(
    'geometryString',
    '',
    ({ part }: go.Shape) =>
      ((part as go.Adornment).adornedObject as go.Shape).geometryString,
  ).ofObject();

const personMainAdornmentShape = () =>
  $(
    go.Shape,
    {
      fill: null,
      stroke: theme.colors.selectionStroke,
      strokeWidth: ADORNMENT_STROKE_WIDTH,
    },
    cloneGeometryBinding(),
  );

// custom adornment template to ensure that image Panel is properly highlighted
export const personSelectionAdornmentTemplate = () =>
  $(
    go.Adornment,
    go.Panel.Spot,
    personMainAdornmentShape(),
    personImage({
      containerProps: {
        alignmentFocus: go.Spot.Top,
        alignment: new go.Spot(
          0,
          0,
          ADORNMENT_STROKE_WIDTH / 2,
          IMAGE_TOP_MARGIN,
        ),
      },
      shapeProps: {
        stroke: theme.colors.selectionStroke,
        strokeWidth: ADORNMENT_STROKE_WIDTH,
      },
    }),
    $(go.Placeholder),
  );
