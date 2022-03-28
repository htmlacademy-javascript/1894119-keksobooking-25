const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

const disabledForm = () => {
  adForm.classList.add('ad-form__disabled');
  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute('disabled', 'disabled');
  }

  mapFiltersForm.classList.add('map__filters--disabled');
  for (let i = 0; i < mapFiltersForm.children.length; i++) {
    mapFiltersForm.children[i].setAttribute('disabled', 'disabled');
  }
};

const activatedForm = () => {
  adForm.classList.remove('ad-form__disabled');
  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute('disabled');
  }

  mapFiltersForm.classList.remove('map__filters--disabled');
  for (let i = 0; i < mapFiltersForm.children.length; i++) {
    mapFiltersForm.children[i].removeAttribute('disabled');
  }
};

disabledForm();
activatedForm();
