import * as go from 'gojs';

import { theme } from '../../../theme';
import { PersonData, Status, statusProperty } from '../../../types';

const getStrokeForStatus = (
  status: Status,
  staticStroke: go.BrushLike | undefined,
) => {
  if (staticStroke) {
    return staticStroke;
  }
  switch (status) {
    case 'king':
    case 'queen':
      return theme.colors.kingQueenBorder;
    case 'prince':
    case 'princess':
      return theme.colors.princePrincessBorder;
    case 'civilian':
      return theme.colors.civilianBorder;
    default:
      return theme.colors.civilianBorder;
  }
};

export const statusStrokeBinding = (staticStroke?: go.BrushLike) =>
  new go.Binding('stroke', statusProperty, (status: Status) =>
    getStrokeForStatus(status, staticStroke),
  );

export const highlightStrokeBinding = (staticStroke?: go.BrushLike) =>
  new go.Binding(
    'stroke',
    'isHighlighted',
    (isHighlighted: boolean, obj: go.GraphObject) =>
      isHighlighted
        ? theme.colors.selectionStroke
        : getStrokeForStatus(
            (obj.part?.data as PersonData).status,
            staticStroke,
          ),
  ).ofObject();
