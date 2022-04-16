import {map} from './map.js';

const MIN_PRICE = 10000;
const MIDDLE_PRICE = 50000;
const DEFAULT_VALUE = 'any';

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');

const filterFormElement = document.querySelector('.map__filters');

const filterElements = [housingType, housingPrice, housingRooms, housingGuests, housingFeatures];

// Проверка типа жилья

const checkType = ({offer}) => {
  if (housingType.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.type === housingType.value;
};

// Проверка цены за ночь

const checkPrice = ({offer}) => {
  if (housingPrice.value === 'low') {
    return offer.price < MIN_PRICE;
  }

  if (housingPrice.value === 'middle') {
    return offer.price > MIN_PRICE && offer.price < MIDDLE_PRICE;
  }

  if (housingPrice.value === 'high') {
    return offer.price > MIDDLE_PRICE;
  }

  return true;
};

// Проверка количества комнат

const checkRooms = ({offer}) => {
  if (housingRooms.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.rooms === housingRooms.value;
};

// Проверка числа гостей

const checkGuests = ({offer}) => {
  if (housingGuests.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.guests === housingGuests.value;
};

// Проверка особенностей

const checkFeatures = ({offer}) => {
  const features = document.querySelectorAll('.map__checkbox:checked');
  if (!offer.features && features.length > 0) {
    return false;
  }
  for (let i = 0; i < features.length; i++) {
    if (!offer.features.includes(features[i].value)) {
      return false;
    }
  }
  return true;
};

const totalMatch = (data) => data.filter((item) =>
  checkType(item) && checkPrice(item) && checkRooms(item) && checkGuests(item) && checkFeatures(item));

const filterChange = (cb) => {
  filterFormElement.addEventListener('change', () => {
    cb();
  });
};

export {filterChange, totalMatch};

// Закрытие попапа при фильтрации

filterElements.forEach((element) => {
  element.addEventListener('change', () => {
    map.closePopup();
  });
});

