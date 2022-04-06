const adForm = document.querySelector('.ad-form');
const priceSlider = adForm.querySelector('.ad-form__slider');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');

noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

priceSlider.noUiSlider.on('update', () => {
  price.value = priceSlider.noUiSlider.get();
});

price.addEventListener('change', () => priceSlider.noUiSlider.set(price.value));
type.addEventListener('change', () => priceSlider.noUiSlider.set(price.placeholder));
