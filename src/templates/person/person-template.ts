import * as go from 'gojs';

import { personBadge } from './panels/badge';
import { personImage } from './panels/image';
import { personMainShape } from './panels/main-shape';
import { personNameTextBlock } from './panels/name-textblock';
import { personBirthDeathTextBlock } from './panels/birth-death-textblock';
import { IMAGE_TOP_MARGIN, MAIN_SHAPE_NAME, STROKE_WIDTH } from './settings';
import { personSelectionAdornmentTemplate } from './selection-adornment-template';
import { onMouseEnterPart, onMouseLeavePart } from '../common-events';

const $ = go.GraphObject.make;

export const createPersonTemplate = () =>
  $(
    go.Node,
    go.Panel.Spot,
    {
      selectionAdornmentTemplate: personSelectionAdornmentTemplate(),
      selectionObjectName: MAIN_SHAPE_NAME,
      mouseEnter: onMouseEnterPart,
      mouseLeave: onMouseLeavePart,
    },
    new go.Binding('layerName', 'isSelected', (isSelected: boolean) =>
      isSelected ? 'Foreground' : '',
    ).ofObject(),
    $(
      go.Panel,
      go.Panel.Spot,
      personMainShape(),
      personNameTextBlock({
        alignmentFocus: go.Spot.Top,
        alignment: new go.Spot(0.5, 0, 0, 25),
      }),
      personBirthDeathTextBlock({
        alignmentFocus: go.Spot.Top,
        alignment: new go.Spot(0.5, 1, 0, -35),
      }),
    ),
    personImage({
      containerProps: {
        alignmentFocus: go.Spot.Top,
        alignment: new go.Spot(0, 0, STROKE_WIDTH / 2, IMAGE_TOP_MARGIN),
      },
    }),
    personBadge({
      containerProps: {
        alignmentFocus: go.Spot.TopRight,
        alignment: new go.Spot(1, 0, -25, STROKE_WIDTH - 0.5),
      },
    }),
  );
