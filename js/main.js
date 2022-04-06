import './form-validation.js';
import {map} from './map.js';
import {disabledPage, activatedPage} from './page-state.js';

if (map) {
  map.on('load', () => {
    activatedPage();
  });
} else {
  disabledPage();
}
