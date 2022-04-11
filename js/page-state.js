import {resetMap} from './map.js';

const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const resetButton = adForm.querySelector('.ad-form__reset');

const disabledElements = (element) => {
  for (let i = 0; i < element.children.length; i++) {
    element.children[i].setAttribute('disabled', 'disabled');
  }
};

const activatedElements = (element) => {
  for (let i = 0; i < element.children.length; i++) {
    element.children[i].removeAttribute('disabled');
  }
};

const disabledPage = () => {
  adForm.classList.add('ad-form__disabled');
  disabledElements(adForm);

  mapFiltersForm.classList.add('map__filters--disabled');
  disabledElements(mapFiltersForm);
};

const activatedPage = () => {
  adForm.classList.remove('ad-form__disabled');
  activatedElements(adForm);

  mapFiltersForm.classList.remove('map__filters--disabled');
  activatedElements(mapFiltersForm);
};

const resetForm = () => {
  adForm.reset();
  mapFiltersForm.reset();
  resetMap();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {disabledPage, activatedPage, resetForm};
