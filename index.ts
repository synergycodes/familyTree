import FontFaceObserver from 'fontfaceobserver';

import { initDiagram } from './src/diagram';
import './styles.css';

new FontFaceObserver('Poppins', { weight: 500 }).load().then(() => {
  initDiagram('diagram');
});
