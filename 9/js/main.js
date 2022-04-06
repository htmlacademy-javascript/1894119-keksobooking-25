import './form-validation.js';
import {map} from './map.js';
import {disabledPage, activatedPage} from './page-state.js';
import './priceSlider.js';

if (map) {
  L.map('map-canvas')
    .on('load', () => {
      activatedPage();
    });
}

disabledPage();
