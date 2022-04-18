import './form-validation.js';
import {initMap, renderMarkers} from './map.js';
import {getData} from './api.js';
import {disablePage} from './page-state.js';
import {showAlert} from './form-messages.js';
import {cangeFilter} from './filter.js';
import {debounce} from './util.js';
import './photos.js';

const RENDER_DELAY = 500;

disablePage();

const onLoadSuccess = (cards) => {
  initMap();
  renderMarkers(cards);
  cangeFilter(debounce(
    () => renderMarkers(cards),
    RENDER_DELAY,
  ));
};

getData(onLoadSuccess, showAlert);
