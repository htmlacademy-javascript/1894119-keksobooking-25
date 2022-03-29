const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const MAX_PRICE = 100000;

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('[name="title"]');
const price = adForm.querySelector('[name="price"]');
const type = adForm.querySelector('[name="type"]');
const rooms = adForm.querySelector('[name="rooms"]');
const capacity = adForm.querySelector('[name="capacity"]');

const capacityOptions = {
  '1' : '1',
  '2' : ['2','1'],
  '3' : ['3','2','1'],
  '100' : '0',
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

// Заголовок объявления

const validateTitle = (value) => value.length >= TITLE_MIN_LENGTH && value.length <= TITLE_MAX_LENGTH;

const getValidateTitleErrorMessage = () => `Длина заголовка от ${TITLE_MIN_LENGTH} до ${TITLE_MAX_LENGTH} символов`;

pristine.addValidator(title, validateTitle, getValidateTitleErrorMessage);

// Цена за ночь

const validatePrice = (value) => value.length >= MIN_PRICE[type.value] && value.length <= MAX_PRICE;

const getValidatePriceErrorMessage = () => {
  if (price.value >= MAX_PRICE) {
    return `Максимальная цена за ночь — ${MAX_PRICE}`;
  }
  if (price.value <= MIN_PRICE[type.value]) {
    return `Минимальная цена за ночь для выбранного типа жилья — ${MIN_PRICE[type.value]}`;
  }
};

pristine.addValidator(price, validatePrice, getValidatePriceErrorMessage);

price.addEventListener('change', () => {
  price.placeholder =  MIN_PRICE[type.value];
});

// Количество комнат и количество мест

const validateCapacity = () => capacityOptions[rooms.value].includes(capacity.value);

const getValidateCapacityErrorMessage = () => {
  if (rooms.value === 100) {
    return 'Не для гостей';
  }
  return 'Количество гостей не должно превышать количество комнат';
};

pristine.addValidator(capacity, validateCapacity, getValidateCapacityErrorMessage);

// Обработчик события

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    window.console.log('Форма не валидна');
  }
  pristine.validate();
});
