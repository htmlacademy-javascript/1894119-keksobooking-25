import {createAds} from './data';

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const similarAds = createAds();
const similarAdsListFragment = document.createDocumentFragment();

similarAds.forEach(({author, offer}) => {
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

  const valueTypes = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель'
  };

  const addData = (data, element) => {
    if (data) {
      element.textContent = data;
    }
    element.classList.add('.visually-hidden');
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
    popupCapacity.classList.add('.visually-hidden');
  }

  if (offer.checkin && offer.checkout) {
    popupTime.textContent = `Заезд после${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    popupTime.classList.add('.visually-hidden');
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
    popupFeaturesList.classList.add('.visually-hidden');
  }

  if (offer.photos) {
    popupPhotos.innerHTML = '';
    for (let i = 0; i < offer.photos.length; i++){
      const PHOTO_WIDTH = '45';
      const PHOTO_HEIGHT = '40';
      const popupPhoto = document.createElement('img');
      popupPhoto.classList.add('popup__photo');
      popupPhoto.width = PHOTO_WIDTH;
      popupPhoto.height = PHOTO_HEIGHT;
      popupPhoto.src = offer.photos[i];
      popupPhoto.alt = 'Фотография жилья';
      popupPhotos.append(popupPhoto);
    }
  } else {
    popupPhotos.classList.add('.visually-hidden');
  }

  if (author.avatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.classList.add('.visually-hidden');
  }

  similarAdsListFragment.append(popup);
});

mapCanvas.append(similarAdsListFragment[0]);
