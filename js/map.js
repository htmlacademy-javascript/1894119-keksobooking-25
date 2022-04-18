import {renderAds} from './render-ads.js';
import {CENTER_TOKIO_LAT, CENTER_TOKIO_LNG, MAP_ZOOM} from './const.js';
import {activatePage} from './page-state.js';
import {filterAll} from './filter.js';

const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_ANCHOR = [26, 52];
const PIN_ICON_SIZE = [40, 40];
const PIN_ICON_ANCHOR = [20, 40];

const SIMILAR_ADS_COUNT = 10;

const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('[name="address"]');

const setAddressFieldValue = (address) => {
  addressField.value = `${address.lat.toFixed(5)}, ${address.lng.toFixed(5)}`;
};

const map = L.map('map-canvas');

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
      lat: point.location.lat,
      lng: point.location.lng,
    },
    {
      icon: offerPinIcon,
    },
  );

  offerPinMarker
    .addTo(markerGroup)
    .bindPopup(renderAds(point));
};

// Отрисовка маркеров с объявлениями

const renderMarkers = (data) => {
  markerGroup.clearLayers();
  const similarAds = filterAll(data).slice();
  similarAds.slice(0, SIMILAR_ADS_COUNT).forEach((point) => {
    createOfferMarker(point);
  });
};

// Инициализация карты

const initMap = () => {
  map.on('load', () => {
    activatePage();
  })
    .setView({
      lat: CENTER_TOKIO_LAT,
      lng: CENTER_TOKIO_LNG,
    }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    setAddressFieldValue(evt.target.getLatLng());
  });

  return map;
};

export {map, mainPinMarker, renderMarkers, initMap};
