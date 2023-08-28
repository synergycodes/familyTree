import { NodeCategory, CoupleInputInfo, LinkParserOutput } from '../types';

const createCounterKey = (parents: string[]) => parents.join('-');

const createCounterNode = ({ spouses, children }: CoupleInputInfo) => ({
  key: createCounterKey(spouses),
  category: NodeCategory.Counter,
  count: children.length,
});

// create link connecting 2 spouses directly without counter node
// it happens only when they have no children
const createParentParentLink = (
  { spouses, dotted }: CoupleInputInfo,
  parentsHavingParentSet: Set<string>,
) => ({
  // due to how LayeredDigraphLayout works, we need to make sure that
  // parent connected with link to layer above is always before its
  // spouse in topological order
  from: parentsHavingParentSet.has(spouses[0]) ? spouses[0] : spouses[1],
  to: parentsHavingParentSet.has(spouses[0]) ? spouses[1] : spouses[0],
  dotted: dotted,
});

// create link connecting 2 spouses with counter node
const createParentsCounterLinks = (
  { spouses, dotted }: CoupleInputInfo,
  counterKey: string,
) =>
  spouses.map((spouse: string) => ({
    from: spouse,
    to: counterKey,
    dotted,
  }));

// create link connecting counter node with children
const createCounterChildrenLinks = (
  { children }: CoupleInputInfo,
  counterKey: string,
) =>
  children.map((child: string) => ({
    from: counterKey,
    to: child,
    dotted: false,
  }));

// get all parents having connection to layer above
const getParentsHavingParent = (coupleInputInfoArray: CoupleInputInfo[]) =>
  coupleInputInfoArray.reduce<Set<string>>(
    (set: Set<string>, { children }: CoupleInputInfo) => {
      children.forEach((child) => set.add(child));
      return set;
    },
    new Set<string>(),
  );

// instead of connecting parents directly with children, we connect them
// with Counter node which presents number of their children and improves
// readability of the diagram
export const parseLinks = (
  coupleInputInfoArray: CoupleInputInfo[],
): LinkParserOutput => {
  const parentsHavingParentSet = getParentsHavingParent(coupleInputInfoArray);

  return coupleInputInfoArray.reduce<LinkParserOutput>(
    (result: LinkParserOutput, coupleInputInfo: CoupleInputInfo) => {
      // if couple has no children, we connect them directly without Counter node
      if (!coupleInputInfo.children.length) {
        result.links.push(
          createParentParentLink(coupleInputInfo, parentsHavingParentSet),
        );
      } else {
        // otherwise we create Counter node and connect it with parents and children
        const counter = createCounterNode(coupleInputInfo);

        result.counters.push(counter);
        result.links.push(
          ...createParentsCounterLinks(coupleInputInfo, counter.key),
          ...createCounterChildrenLinks(coupleInputInfo, counter.key),
        );
      }
      return result;
    },
    {
      links: [],
      counters: [],
    },
  );
};
