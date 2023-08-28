import * as go from 'gojs';

import { lineShape } from './panels/line-shape';
import { onMouseEnterPart, onMouseLeavePart } from '../common-events';
import { CounterLink } from '../../custom-parts/counter-link';

const $ = go.GraphObject.make;

export const createLinkTemplate = () =>
  $(
    CounterLink,
    {
      selectionAdorned: false,
      routing: go.Link.Orthogonal,
      layerName: 'Background',
      mouseEnter: onMouseEnterPart,
      mouseLeave: onMouseLeavePart,
    },
    lineShape(),
  );
