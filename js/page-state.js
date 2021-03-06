const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

const disableElements = (element) => {
  for (let i = 0; i < element.children.length; i++) {
    element.children[i].setAttribute('disabled', 'disabled');
  }
};

const activateElements = (element) => {
  for (let i = 0; i < element.children.length; i++) {
    element.children[i].removeAttribute('disabled');
  }
};

const disablePage = () => {
  adForm.classList.add('ad-form__disabled');
  disableElements(adForm);

  mapFiltersForm.classList.add('map__filters--disabled');
  disableElements(mapFiltersForm);
};

const activatePage = () => {
  adForm.classList.remove('ad-form__disabled');
  activateElements(adForm);

  mapFiltersForm.classList.remove('map__filters--disabled');
  activateElements(mapFiltersForm);
};

export {disablePage, activatePage};
