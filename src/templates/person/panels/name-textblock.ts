import * as go from 'gojs';

import { theme } from '../../../theme';
import { nameProperty } from '../../../types';

const $ = go.GraphObject.make;

export const personNameTextBlock = (props: Partial<go.TextBlock> = {}) =>
  $(
    go.TextBlock,
    {
      stroke: theme.colors.personText,
      font: theme.fonts.nameFont,
      desiredSize: new go.Size(160, 50),
      overflow: go.TextBlock.OverflowEllipsis,
      textAlign: 'center',
      verticalAlignment: go.Spot.Center,
      toolTip: $(
        'ToolTip',
        $(go.TextBlock, { margin: 4 }, new go.Binding('text', nameProperty)),
      ),
      ...props,
    },
    new go.Binding('text', nameProperty),
  );
