import {similarAds} from './data.js';
import {renderingAds} from './rendering-ads.js';
import {disabledPage, activatedPage} from './page-state.js';
import './form-validation.js';

const mapCanvas = document.querySelector('#map-canvas');
const adsListFragment = document.createDocumentFragment();

similarAds.forEach((card) => {
  adsListFragment.append(renderingAds(card));
});

mapCanvas.append(adsListFragment.children[0]);

disabledPage();
activatedPage();
