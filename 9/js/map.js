import {disabledPage, activatedPage} from './page-state.js';
import {similarAds} from './data.js';
import {renderingAds} from './rendering-ads.js';

const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('[name="address"]');
const resetButton = adForm.querySelector('.ad-form__reset');

disabledPage();

const setAddressFieldValue = (address) => {
  addressField.value = `${address.lat.toFixed(5)}, ${address.lng.toFixed(5)}`;
};

// Подключение карты

const map = L.map('map-canvas')
  .on('load', () => {
    activatedPage();
  })
  .setView({
    lat: 35.681729,
    lng: 139.753927,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Главный маркер с координатами центра Токио

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.681729,
    lng: 139.753927,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// При передвижении главного маркера в форму передаются координаты

mainPinMarker.on('moveend', (evt) => {
  setAddressFieldValue(evt.target.getLatLng());
});

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

similarAds.forEach((marker) => {
  createOfferMarker(marker);
});

// Вернуть карту в исходное состояние

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();

  mainPinMarker.setLatLng({
    lat: 35.681729,
    lng: 139.753927,
  });

  map.setView({
    lat: 35.681729,
    lng: 139.753927,
  }, 13);
});
