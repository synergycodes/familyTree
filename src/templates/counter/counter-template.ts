import * as go from 'gojs';

import { counterMainShape } from './panels/main-shape';
import { counterTextBlock } from './panels/counter-textblock';

const $ = go.GraphObject.make;

export const createCounterTemplate = () =>
  $(
    go.Node,
    go.Panel.Auto,
    {
      selectionAdorned: false,
    },
    counterMainShape(),
    counterTextBlock(),
  );
