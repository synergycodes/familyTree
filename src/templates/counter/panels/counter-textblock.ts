import * as go from 'gojs';

import { theme } from '../../../theme';
import { countProperty } from '../../../types';

const $ = go.GraphObject.make;

export const counterTextBlock = (props: Partial<go.TextBlock> = {}) =>
  $(
    go.TextBlock,
    {
      textAlign: 'center',
      desiredSize: new go.Size(NaN, 14),
      stroke: theme.colors.counterText,
      font: theme.fonts.counterFont,
      ...props,
    },
    new go.Binding('text', countProperty),
  );
