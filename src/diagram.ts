import * as go from 'gojs';

import { createLinkTemplate } from './templates/link/link-template';
import { createCounterTemplate } from './templates/counter/counter-template';
import { mockPeople, mockCoupleInfo } from './mock-data';
import { createPersonTemplate } from './templates/person/person-template';
import { registerCustomShapes } from './templates/custom-shapes';
import { FamilyTreeLayout } from './family-tree-layout';
import { parseInputData } from './input-data-parser/input-data-parser';
import { NodeCategory } from './types';

registerCustomShapes();

const $ = go.GraphObject.make;

export const initDiagram = (divId: string) => {
  const diagram = $(go.Diagram, divId);

  diagram.nodeTemplateMap.add(NodeCategory.Person, createPersonTemplate());
  diagram.nodeTemplateMap.add(NodeCategory.Counter, createCounterTemplate());
  diagram.linkTemplate = createLinkTemplate();
  diagram.model = createModel();

  loadData(diagram);
  applyDiagramSettings(diagram);
  initiallyCenterOnRoots(diagram);
};

const createModel = () => $(go.GraphLinksModel);

const loadData = (diagram: go.Diagram) => {
  const { nodes, links } = parseInputData(mockPeople, mockCoupleInfo);

  diagram.model.addNodeDataCollection(nodes);
  (diagram.model as go.GraphLinksModel).addLinkDataCollection(links);
};

const applyDiagramSettings = (diagram: go.Diagram) => {
  diagram.layout = new FamilyTreeLayout();
  diagram.toolManager.hoverDelay = 100;
};

const initiallyCenterOnRoots = (diagram: go.Diagram) => {
  const root1 = diagram.findNodeForKey('King George V');
  const root2 = diagram.findNodeForKey('Queen Mary');
  if (!root1 || !root2) {
    return;
  }

  diagram.addDiagramListener('InitialLayoutCompleted', () => {
    diagram.centerRect(diagram.computePartsBounds([root1, root2]));
  });
  diagram.scale = 0.6;
};
