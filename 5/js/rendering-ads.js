import {createAds} from './data.js';

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAds = createAds();
const similarAdsListFragment = document.createDocumentFragment();
const valueTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

// Отрисовает одну карточку

const renderingAds = ({author, offer}) => {
  const popup = popupTemplate.cloneNode(true);

  const popupTitle = popup.querySelector('.popup__title');
  const popupAddress = popup.querySelector('.popup__text--address');
  const popupPrice = popup.querySelector('.popup__text--price');
  const popupType = popup.querySelector('.popup__type');
  const popupCapacity = popup.querySelector('.popup__text--capacity');
  const popupTime = popup.querySelector('.popup__text--time');
  const popupDescription = popup.querySelector('.popup__description');
  const popupFeaturesList = popup.querySelectorAll('.popup__feature');
  const popupPhotos = popup.querySelector('.popup__photos');
  const popupAvatar = popup.querySelector('.popup__avatar');

  const addData = (data, element) => {
    if (data) {
      element.textContent = data;
    }
    element.remove();
  };

  const addPhoto = (photoList, data) => {
    photoList.innerHTML = '';
    for (let i = 0; i < data.length; i++){
      const PHOTO_WIDTH = '45';
      const PHOTO_HEIGHT = '40';
      const photoItem = document.createElement('img');
      photoItem.classList.add('popup__photo');
      photoItem.width = PHOTO_WIDTH;
      photoItem.height = PHOTO_HEIGHT;
      photoItem.src = offer.photos[i];
      photoItem.alt = 'Фотография жилья';
      photoList.append(photoItem);
    }
  };

  addData(offer.title, popupTitle);
  addData(offer.address, popupAddress);
  addData(offer.description, popupDescription);
  addData(valueTypes[offer.type], popupType);

  if (offer.price) {
    popupPrice.textContent = `${offer.price }₽/ночь`;
  } else {
    popupPrice.classList.add('.visually-hidden');
  }

  if (offer.rooms && offer.guests) {
    popupCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    popupCapacity.remove();
  }

  if (offer.checkin && offer.checkout) {
    popupTime.textContent = `Заезд после${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    popupTime.remove();
  }

  if (offer.features) {
    popupFeaturesList.forEach((popupFeaturesItem) => {
      const isNecessary = offer.features.some(
        (feature) => popupFeaturesItem.classList.contains(`popup__feature--${feature}`)
      );
      if (!isNecessary) {
        popupFeaturesItem.remove();
      }
    });
  } else {
    popupFeaturesList.remove();
  }

  if (offer.photos) {
    addPhoto(popupPhotos, offer.photos);
  } else {
    popupPhotos.remove();
  }

  if (author.avatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.remove();
  }

  similarAdsListFragment.append(popup);
};

// Отрисовывает все карточки

similarAds.forEach(() => {
  renderingAds();
});

export {similarAdsListFragment};
