import './form-validation.js';
import {initMap, renderMarkers} from './map.js';
import {getData} from './api.js';
import {activatePage, disablePage} from './page-state.js';
import {showAlert} from './form-messages.js';

const SIMILAR_ADS_COUNT = 10;
const GET_DATA_ALERT_MESSAGE = 'Не удалось получить данные с сервера. Обновите страницу';

const onLoadSuccess = (similarAds) => {
  activatePage();
  renderMarkers(similarAds.slice(0, SIMILAR_ADS_COUNT));
};

const onLoadFail = () => showAlert(GET_DATA_ALERT_MESSAGE);

disablePage();

initMap(() => getData(onLoadSuccess, onLoadFail));
