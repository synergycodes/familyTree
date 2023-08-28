import * as go from 'gojs';

import { NodeCategory } from './types';

export class FamilyTreeLayout extends go.LayeredDigraphLayout {
  constructor() {
    super();
    this.direction = 90;
    this.layerSpacing = 50;
    this.columnSpacing = 46;
    this.alignOption = go.LayeredDigraphLayout.AlignAll;
  }

  protected override assignLayers(): void {
    super.assignLayers();
    if (!this.network) {
      return;
    }

    // connected parents without children should be rendered on the same level
    // despite being connected with a link
    this.network.vertexes.each((v: go.LayoutVertex) => {
      if (v.node && v.node.category === NodeCategory.Person) {
        // each node has only one parent node
        const parent = v.sourceVertexes.first();
        if (
          parent &&
          parent.node &&
          parent.node.category === NodeCategory.Person
        ) {
          (v as go.LayeredDigraphVertex).layer = (
            parent as go.LayeredDigraphVertex
          ).layer;
        }
      }
    });
  }
}
