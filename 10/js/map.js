import {renderingAds} from './rendering-ads.js';
import {CENTER_TOKIO_LAT, CENTER_TOKIO_LNG} from './const.js';
import {activatedPage, disabledPage} from './page-state.js';
import {getData} from './api.js';

const MAP_ZOOM = 13;
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_ANCHOR = [26, 52];
const PIN_ICON_SIZE = [40, 40];
const PIN_ICON_ANCHOR = [20, 40];

const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('[name="address"]');

const setAddressFieldValue = (address) => {
  addressField.value = `${address.lat.toFixed(5)}, ${address.lng.toFixed(5)}`;
};

disabledPage();

const map = L.map('map-canvas')
  .on('load', () => {
    activatedPage();
    getData();
  })
  .setView({
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  }, MAP_ZOOM);

// Главный маркер с координатами центра Токио

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_ANCHOR,
});

const mainPinMarker = L.marker(
  {
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// Маркеры с объявлениями

const offerPinIcon = L.icon ({
  iconUrl: './img/pin.svg',
  iconSize: PIN_ICON_SIZE,
  iconAnchor: PIN_ICON_ANCHOR,
});

const markerGroup = L.layerGroup().addTo(map);

const createOfferMarker = (point) => {
  const offerPinMarker = L.marker(
    {
      lat: point.lat,
      lng: point.lng,
    },
    {
      icon: offerPinIcon,
    },
  );

  offerPinMarker
    .addTo(markerGroup)
    .bindPopup(renderingAds(point));
};

// Отрисовка маркеров с объявлениями

const renderMarkers = (similarAds) => {
  similarAds.forEach((point) => {
    createOfferMarker(point);
  });
};

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

  addressField.value = `${CENTER_TOKIO_LAT}, ${CENTER_TOKIO_LNG}`;
};

// Рендер карты

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Добавить главный маркер

mainPinMarker.addTo(map);

// При передвижении главного маркера в форму передаются координаты

mainPinMarker.on('moveend', (evt) => {
  setAddressFieldValue(evt.target.getLatLng());
});

export {resetMap, renderMarkers};
