import './form-validation.js';
import {renderMarkers} from './map.js';
import {getData} from './api.js';

const SIMILAR_AD_COUNT = 10;

getData((similarAds) => {
  renderMarkers(similarAds.slice(0, SIMILAR_AD_COUNT));
});

