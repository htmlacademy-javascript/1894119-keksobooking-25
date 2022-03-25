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

const addPhoto = (photoList, photoArray) => {
  photoList.innerHTML = '';

  for (let i = 0; i < photoArray.length; i++){
    const PHOTO_WIDTH = '45';
    const PHOTO_HEIGHT = '40';
    const photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.width = PHOTO_WIDTH;
    photoItem.height = PHOTO_HEIGHT;
    photoItem.src = photoArray[i];
    photoItem.alt = 'Фотография жилья';
    photoList.append(photoItem);
  }

  return photoList;
};

const addFeatures = (featuresList, featuresArray) => {
  featuresList.innerHTML = '';

  featuresArray.forEach((feature) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature' , `popup__feature--${feature}` );
    featuresList.appendChild(featureItem);
  });

  return featuresList;
};


// Отрисовает одну карточку

const renderingAds = ({author, offer}) => {
  const popup = popupTemplate.cloneNode(true);

  popup.querySelector('.popup__title').textContent = offer.title;
  popup.querySelector('.popup__text--address').textContent = offer.address;
  popup.querySelector('.popup__text--price').textContent = `${offer.price }₽/ночь`;
  popup.querySelector('.popup__type').textContent = valueTypes[offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после${offer.checkin}, выезд до ${offer.checkout}`;
  addPhoto(popup.querySelector('.popup__photos'), offer.photos);
  popup.querySelector('.popup__description').textContent = offer.description;
  addFeatures(popup.querySelector('.popup__features'), offer.features);
  popup.querySelector('.popup__avatar').src = author.avatar;

  similarAdsListFragment.append(popup);
};

// Отрисовывает все карточки

similarAds.forEach((card) => {
  renderingAds(card);
});

export {similarAdsListFragment};
