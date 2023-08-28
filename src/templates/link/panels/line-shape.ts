import * as go from 'gojs';

import { theme } from '../../../theme';
import { dottedProperty } from '../../../types';

const $ = go.GraphObject.make;

export const lineShape = (props: Partial<go.Shape> = {}) =>
  $(
    go.Shape,
    {
      stroke: theme.colors.link,
      strokeWidth: 2,
      ...props,
    },
    new go.Binding('strokeDashArray', dottedProperty, (dotted: boolean) =>
      dotted ? [3, 6] : null,
    ),
    new go.Binding('stroke', 'isHighlighted', (isHighlighted: boolean) =>
      isHighlighted ? theme.colors.selectionStroke : theme.colors.link,
    ).ofObject(),
    new go.Binding('stroke', 'isSelected', (selected: boolean) =>
      selected ? theme.colors.selectionStroke : theme.colors.link,
    ).ofObject(),
    new go.Binding('strokeWidth', 'isSelected', (selected: boolean) =>
      selected ? 3 : 2,
    ).ofObject(),
  );
