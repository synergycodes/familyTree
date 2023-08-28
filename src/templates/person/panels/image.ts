import * as go from 'gojs';

import { theme } from '../../../theme';
import KingIcon from '../../../assets/king.svg';
import PrinceIcon from '../../../assets/prince.svg';
import MaleCivilianIcon from '../../../assets/male-civilian.svg';
import FemaleCivilianIcon from '../../../assets/female-civilian.svg';
import { STROKE_WIDTH } from '../settings';
import { highlightStrokeBinding, statusStrokeBinding } from './common-bindings';
import { PersonData } from '../../../types';

const $ = go.GraphObject.make;

const IMAGE_DIAMETER = 40;

const imageSourceBinding = () =>
  new go.Binding('source', '', ({ status, gender }: PersonData) => {
    switch (status) {
      case 'king':
      case 'queen':
        return KingIcon;
      case 'prince':
      case 'princess':
        return PrinceIcon;
      case 'civilian':
        return gender === 'M' ? MaleCivilianIcon : FemaleCivilianIcon;
      default:
        return MaleCivilianIcon;
    }
  });

export const personImage = ({
  containerProps,
  shapeProps,
}: Partial<{
  containerProps: Partial<go.Panel>;
  shapeProps: Partial<go.Shape>;
}> = {}) =>
  $(
    go.Panel,
    go.Panel.Spot,
    (() => (containerProps ? { ...containerProps } : {}))(),
    $(
      go.Shape,
      {
        figure: 'Circle',
        fill: theme.colors.personNodeBackground,
        strokeWidth: STROKE_WIDTH,
        desiredSize: new go.Size(IMAGE_DIAMETER, IMAGE_DIAMETER),
      },
      (() => (shapeProps ? { ...shapeProps } : {}))(),
      statusStrokeBinding(shapeProps?.stroke),
      highlightStrokeBinding(shapeProps?.stroke),
    ),
    $(
      go.Picture,
      {
        scale: 0.9,
      },
      imageSourceBinding(),
    ),
  );
