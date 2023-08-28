import { PersonInputData, CoupleInputInfo } from '../types';
import { parseLinks } from './link-parser';
import { parseNodes } from './node-parser';

export const parseInputData = (
  people: PersonInputData[],
  couplesInputInfo: CoupleInputInfo[],
) => {
  const { links, counters } = parseLinks(couplesInputInfo);

  return {
    nodes: [...parseNodes(people), ...counters],
    links,
  };
};
