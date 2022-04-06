import {similarAds} from './data.js';
import {renderingAds} from './rendering-ads.js';
import {CENTER_TOKIO_LAT, CENTER_TOKIO_LNG, MAP_ZOOM} from './const.js';

const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('[name="address"]');

const setAddressFieldValue = (address) => {
  addressField.value = `${address.lat.toFixed(5)}, ${address.lng.toFixed(5)}`;
};

const map = L.map('map-canvas')
  .setView({
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  }, MAP_ZOOM);

// Главный маркер с координатами центра Токио

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createOfferMarker = ({author, offer, location}) => {
  const offerPinMarker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon: offerPinIcon,
    },
  );

  offerPinMarker
    .addTo(markerGroup)
    .bindPopup(renderingAds({author, offer}));
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

// Добавить маркеры с объявлениями

similarAds.forEach((marker) => {
  createOfferMarker(marker);
});

// При передвижении главного маркера в форму передаются координаты

mainPinMarker.on('moveend', (evt) => {
  setAddressFieldValue(evt.target.getLatLng());
});

export {map};
