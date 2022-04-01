const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const MAX_PRICE = 100000;
const MAX_ROOMS = 100;

const adForm = document.querySelector('.ad-form');
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

const validatePrice = (value) => value >= MIN_PRICE[type.value] && value <= MAX_PRICE;

const getValidatePriceErrorMessage = () => {
  if (price.value >= MAX_PRICE) {
    return `Максимальная цена за ночь — ${MAX_PRICE}`;
  }
  if (price.value <= MIN_PRICE[type.value]) {
    return `Минимальная цена за ночь для выбранного типа жилья — ${MIN_PRICE[type.value]}`;
  }
};

const validateCapacity = () => capacityOptions[rooms.value].includes(capacity.value);

const getValidateCapacityErrorMessage = () => {
  if (rooms.value === MAX_ROOMS) {
    return 'Не для гостей';
  }
  return 'Количество гостей не должно превышать количество комнат';
};

pristine.addValidator(price, validatePrice, getValidatePriceErrorMessage);

pristine.addValidator(capacity, validateCapacity, getValidateCapacityErrorMessage);

type.addEventListener('change', () => {
  price.placeholder =  MIN_PRICE[type.value];
  pristine.validate(price);
});

rooms.addEventListener('change', () => pristine.validate(capacity));

adForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
