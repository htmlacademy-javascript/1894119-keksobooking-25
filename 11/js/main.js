import './form-validation.js';
import {initMap, renderMarkers} from './map.js';
import {getData} from './api.js';
import {disablePage} from './page-state.js';
import {showAlert} from './form-messages.js';
import {filterChange} from './filter.js';
import {debounce} from './util.js';

const RENDER_DELAY = 500;

disablePage();

getData((cards) => {
  initMap();
  renderMarkers(cards);
  filterChange(debounce(
    () => renderMarkers(cards),
    RENDER_DELAY,
  ));
},
showAlert
);
