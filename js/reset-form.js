import {CENTER_TOKIO_LAT, CENTER_TOKIO_LNG, MAP_ZOOM, SLIDER_START} from './const.js';
import {map, mainPinMarker} from './map.js';
import {priceSlider} from './price-slider.js';
import {clearPhotoPreview} from './photos.js';

const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('[name="address"]');
const resetButton = adForm.querySelector('.ad-form__reset');
const mapFiltersForm = document.querySelector('.map__filters');

// Возвращение карты в исходное состояние

const resetMap = () => {
  mainPinMarker.setLatLng({
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  });
  map.setView({
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  }, MAP_ZOOM);
  map.closePopup();

  addressField.value = `${CENTER_TOKIO_LAT}, ${CENTER_TOKIO_LNG}`;
};

// Очистка формы

const resetForm = () => {
  adForm.reset();
  mapFiltersForm.reset();
  resetMap();
  priceSlider.noUiSlider.updateOptions({
    start: SLIDER_START,
  });
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  clearPhotoPreview();
});

export {resetForm};
