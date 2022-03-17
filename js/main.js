const TITLES = [
  'Палатка в лесу',
  'Дворец султана Сулеймана',
  'Трёшка на Невском',
  'Комната в студенческой общаге',
  'Бунгало на пляже',
  'Чулан под лестницей',
  'Загородный домик',
];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHEKIN_TIME = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = [
  'Сдаётся только славянам',
  'Без детей и животных',
  'Ремонт в стиле лофт',
  'Сдаётся впервые',
  'Только на длительный срок',
  'От собственника! Агентам не беспокоить',
  'Красивый вид из окна',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MINIMUM_LAT = 35.65000;
const MAXIMUM_LAT = 35.70000;
const MINIMUM_LNG = 139.70000;
const MAXIMUM_LNG = 139.80000;

const MINIMUM_PRICE = 1000;
const MAXIMUM_PRICE = 100000;

const MINIMUM_ROOMS = 1;
const MAXIMUM_ROOMS = 5;

const MINIMUM_GUESTS = 1;
const MAXIMUM_GUESTS = 5;

const PROMO_COUNT = 10;

const getUserID = () => {
  let i = 1;
  return function() {
    if (i < 10) {
      return '0${i++}';
    } else {
      return i++;
    }
  };
};

const getRandomInteger = (min, max) => {
  if (min >= 0 && max > 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (max >= min) {
    return min;
  }

  return ('Задан неверный диапазон! Укажите другие числа.');
}

const getRandomFraction = (min, max, decimalPlaces) => {
  if (min >= 0 && max > 0 && min < max) {
    return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
  }

  if (max >= min) {
    return min.toFixed(decimalPlaces);
  }

  return ('Задан неверный диапазон! Укажите другие числа.');
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArray = (array) => array.slice(0, getRandomInteger(1, array.length - 1));

const lat = getRandomFraction(MINIMUM_LAT, MAXIMUM_LAT, 5);
const lng = getRandomFraction(MINIMUM_LNG, MAXIMUM_LNG, 5);

const createPromo = () => {
  return {
    author: {
      avatar: 'img/avatars/user${getUserID()}.png',
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: lat, lng,
      price: getRandomInteger(MINIMUM_PRICE, MAXIMUM_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(MINIMUM_ROOMS, MAXIMUM_ROOMS),
      guests: getRandomInteger(MINIMUM_GUESTS, MAXIMUM_GUESTS),
      checkin: getRandomArrayElement(CHEKIN_TIME),
      checkout: getRandomArrayElement(CHECKOUT_TIME),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: lat,
      lng: lng,
    }
  };
};

const getPromo = () => {
  Array.from({length: PROMO_COUNT}, createPromo);
};

getPromo();
