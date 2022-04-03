const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

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

export {disabledPage, activatedPage};
