import * as go from 'gojs';

import { iteratorToArray } from '../utils';
import { NodeCategory } from '../types';

const getOtherParentForCounter = (
  counter: go.Node,
  parent: go.Node,
): go.Node | undefined => {
  const parents = iteratorToArray(counter.findNodesConnected());
  return parents[0] !== parent ? parents[0] : parents[1];
};

const parentAfterOtherParent = (parent: go.Node, otherParent: go.Node) =>
  parent.position.x > otherParent.position.x;

const rightParentBeforeCounter = (parent: go.Node, counter: go.Node) =>
  parent.actualBounds.centerX < counter.actualBounds.right;

const leftParentBeforeCounter = (parent: go.Node, counter: go.Node) =>
  parent.actualBounds.centerX < counter.actualBounds.left;

const areTwoPeopleConnectedDirectly = (
  fromNode: go.Node | null,
  toNode: go.Node | null,
) =>
  fromNode &&
  toNode &&
  fromNode.category === NodeCategory.Person &&
  toNode.category === NodeCategory.Person;

// Custom link implementation allowing to dynamically assign
// Counter's fromSpot/toSpot basing on position of other nodes connected to it
export class CounterLink extends go.Link {
  // prioritize Left/Right toSpots for 'Person to Counter' links
  override computeSpot(
    from: boolean,
    port?: go.GraphObject | null | undefined,
  ): go.Spot {
    if (!this.fromNode || !this.toNode || !port) {
      return super.computeSpot(from, port);
    }

    // two people are connected directly only when they're childless marriage
    if (areTwoPeopleConnectedDirectly(this.fromNode, this.toNode)) {
      return go.Spot.BottomSide;
    }

    // fromSpot behavior can be clearly defined in port definition for
    // each node's category as it doesn't depend on the other node in our
    // family tree
    if (from) {
      return port.fromSpot;
    }

    // toSpot behavior for other nodes than Counter can be clearly
    // defined in port definition as it doesn't depend on the other node
    // in our family tree
    if (this.toNode.category !== NodeCategory.Counter) {
      return port.toSpot;
    }

    // counter's toSpot behavior depends on horizontal location of parents
    const counter = this.toNode;
    const parent = this.fromNode;
    const otherParent = getOtherParentForCounter(counter, parent);

    // edge case, it shouldn't happen as counter shows up only for
    // marriage with children
    if (!otherParent) {
      return go.Spot.Top;
    }

    // if parent is placed horizontally before other parent, it should be connected to
    // left side of the counter, otherwise to top side or right side
    if (parentAfterOtherParent(parent, otherParent)) {
      // if parent is  placed horizontally after the other parent but still before
      // the counter, it should be connected to top side of the counter,
      // otherwise to right side
      return rightParentBeforeCounter(parent, counter)
        ? go.Spot.Top
        : go.Spot.Right;
    } else {
      // if parent is placed horizontally before the other parent, but after the counter,
      // it should be connected to top side of the counter, otherwise to left side
      return !leftParentBeforeCounter(parent, counter)
        ? go.Spot.Top
        : go.Spot.Left;
    }
  }

  // dynamically calculate endSegmentLength for Person to Person links
  override computeEndSegmentLength(
    node: go.Node | null,
    port: go.GraphObject | null,
    spot: go.Spot,
    from: boolean,
  ): number {
    if (areTwoPeopleConnectedDirectly(this.fromNode, this.toNode)) {
      return (this.diagram?.layout as go.LayeredDigraphLayout).layerSpacing;
    }

    return super.computeEndSegmentLength(node, port, spot, from);
  }
}
