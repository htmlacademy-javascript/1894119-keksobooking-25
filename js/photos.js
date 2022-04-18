const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const PHOTO_WIDTH = '200px';
const PHOTO_HEIGHT = '200px';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');
const avatarChooser = adForm.querySelector('.ad-form-header__input');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const photoChooser = adForm.querySelector('.ad-form__input');
const photoPreview = adForm.querySelector('.ad-form__photo');

const getPreview = (fileChooser, previewImg) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImg.src = URL.createObjectURL(file);
  }
};

const onAvatarChange = () => getPreview(avatarChooser, avatarPreview);

const onAdsPhotoChange = (evt) => {
  const photo = document.createElement('img');
  photoPreview.innerHTML = '';
  photo.style.width = PHOTO_WIDTH;
  photo.style.height = PHOTO_HEIGHT;
  photoPreview.append(photo);
  getPreview(evt.target, photo);
};

const clearPhotosPreview = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  photoPreview.innerHTML='';
};

avatarChooser.addEventListener('change', onAvatarChange);

photoChooser.addEventListener('change', onAdsPhotoChange);

export {clearPhotosPreview};
