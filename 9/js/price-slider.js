import {MAX_PRICE, MIN_PRICE, SLIDER_STEP} from './const.js';

const adForm = document.querySelector('.ad-form');
const priceSlider = adForm.querySelector('.ad-form__slider');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');

noUiSlider.create(priceSlider, {
  range: {
    min: MIN_PRICE,
    max: MAX_PRICE,
  },
  start: price.placeholder,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

priceSlider.noUiSlider.on('update', () => {
  price.value = priceSlider.noUiSlider.get();
});

price.addEventListener('change', () => priceSlider.noUiSlider.set(price.value));
type.addEventListener('change', () => priceSlider.noUiSlider.set(price.placeholder));
