import {map} from './map.js';

const MIN_PRICE = 10000;
const MIDDLE_PRICE = 50000;
const DEFAULT_VALUE = 'any';
const LOW_PRICE_VALUE = 'low';
const MIDDLE_PRICE_VALUE = 'middle';
const HIGH_PRICE_VALUE = 'high';

const filterFormElement = document.querySelector('.map__filters');

const housingType = filterFormElement.querySelector('#housing-type');
const housingPrice = filterFormElement.querySelector('#housing-price');
const housingRooms = filterFormElement.querySelector('#housing-rooms');
const housingGuests = filterFormElement.querySelector('#housing-guests');
const housingFeatures = filterFormElement.querySelector('#housing-features');

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
  if (housingPrice.value === LOW_PRICE_VALUE) {
    return offer.price < MIN_PRICE;
  }

  if (housingPrice.value === MIDDLE_PRICE_VALUE) {
    return offer.price > MIN_PRICE && offer.price < MIDDLE_PRICE;
  }

  if (housingPrice.value === HIGH_PRICE_VALUE) {
    return offer.price > MIDDLE_PRICE;
  }

  return true;
};

// Проверка количества комнат

const checkRooms = ({offer}) => {
  if (housingRooms.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.rooms === Number(housingRooms.value);
};

// Проверка числа гостей

const checkGuests = ({offer}) => {
  if (housingGuests.value === DEFAULT_VALUE) {
    return true;
  }
  return offer.guests === Number(housingGuests.value);
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

const filterALL = (data) => data.filter((item) =>
  checkType(item) && checkPrice(item) && checkRooms(item) && checkGuests(item) && checkFeatures(item));

const filterChange = (cb) => {
  filterFormElement.addEventListener('change', () => {
    cb();
  });
};

// Закрытие попапа при фильтрации

filterElements.forEach((element) => {
  element.addEventListener('change', () => {
    map.closePopup();
  });
});

export {filterChange, filterALL};
