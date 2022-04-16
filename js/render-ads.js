const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const valueTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const addPhotos = (photoList, photos) => {
  photoList.innerHTML = '';

  for (let i = 0; i < photos.length; i++) {
    const photoItem = document.createElement('img');
    photoItem.classList.add('popup__photo');
    photoItem.width = PHOTO_WIDTH;
    photoItem.height = PHOTO_HEIGHT;
    photoItem.src = photos[i];
    photoItem.alt = 'Фотография жилья';
    photoList.append(photoItem);
  }

  return photoList;
};

const addFeatures = (featuresList, features) => {
  featuresList.innerHTML = '';

  features.forEach((feature) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature' , `popup__feature--${feature}` );
    featuresList.appendChild(featureItem);
  });

  return featuresList;
};

const renderAds = ({author, offer}) => {
  const popup = popupTemplate.cloneNode(true);
  const featureContainer = popup.querySelector('.popup__features');

  popup.querySelector('.popup__title').textContent = offer.title;
  popup.querySelector('.popup__text--address').textContent = offer.address;
  popup.querySelector('.popup__text--price').textContent = `${offer.price }₽/ночь`;
  popup.querySelector('.popup__type').textContent = valueTypes[offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после${offer.checkin}, выезд до ${offer.checkout}`;
  addPhotos(popup.querySelector('.popup__photos'), offer.photos);
  popup.querySelector('.popup__description').textContent = offer.description;

  if (offer.features && offer.features.length > 0) {
    featureContainer.innerHTML = '';
    addFeatures(featureContainer, offer.features);
  } else {
    featureContainer.remove();
  }

  popup.querySelector('.popup__avatar').src = author.avatar;

  return popup;
};

export {renderAds};
