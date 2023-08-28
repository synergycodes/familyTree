import * as go from 'gojs';

import { theme } from '../../../theme';
import { PersonData } from '../../../types';

const $ = go.GraphObject.make;

export const personBirthDeathTextBlock = (props: Partial<go.TextBlock> = {}) =>
  $(
    go.TextBlock,
    {
      stroke: theme.colors.personText,
      font: theme.fonts.birthDeathFont,
      ...props,
    },
    new go.Binding('text', '', ({ born, death }: PersonData) => {
      if (!born && !death) {
        return 'Unknown';
      }
      return `${born} - ${death ?? 'Unknown'}`;
    }),
  );
