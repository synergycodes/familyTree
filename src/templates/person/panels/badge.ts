import * as go from 'gojs';

import { theme } from '../../../theme';
import { CORNER_ROUNDNESS } from '../settings';
import { Gender, genderProperty } from '../../../types';

const $ = go.GraphObject.make;

const genderToText = (gender: Gender) => (gender === 'M' ? 'MALE' : 'FEMALE');

const genderToTextColor = (gender: Gender) =>
  gender === 'M' ? theme.colors.maleBadgeText : theme.colors.femaleBadgeText;

const genderToFillColor = (gender: Gender) =>
  gender === 'M'
    ? theme.colors.maleBadgeBackground
    : theme.colors.femaleBadgeBackground;

export const personBadge = ({
  containerProps,
}: Partial<{
  containerProps: Partial<go.Panel>;
}> = {}) =>
  $(
    go.Panel,
    go.Panel.Auto,
    (() => (containerProps ? { ...containerProps } : {}))(),
    $(
      go.Shape,
      {
        figure: 'RoundedBottomRectangle',
        parameter1: CORNER_ROUNDNESS,
        desiredSize: new go.Size(NaN, 22.5),
        stroke: null,
      },
      new go.Binding('fill', genderProperty, genderToFillColor),
    ),
    $(
      go.TextBlock,
      {
        margin: new go.Margin(0, 2, 0, 2),
        alignment: new go.Spot(0.5, 0.5, 0, 2),
        alignmentFocus: go.Spot.Center,
        font: theme.fonts.badgeFont,
      },
      new go.Binding('stroke', genderProperty, genderToTextColor),
      new go.Binding('text', genderProperty, genderToText),
    ),
  );
