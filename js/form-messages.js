const ESC = 'Escape';

const isEscapeKey = (evt) => evt.key === ESC;

const successTemplate = document.querySelector('#success').content.querySelector('.success');

const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-container');
  alertContainer.textContent = message;
  document.body.append(alertContainer);
};

const showMessage = (template) => {
  const message =  template.cloneNode(true);

  const onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      message.remove();
    }
  };

  message.addEventListener('click', () => message.remove());
  document.addEventListener('keydown', onEscKeydown);
  document.body.append(message);
};


const showSuccessMessage = () => showMessage(successTemplate);
const showFailMessage = () => showMessage(errorTemplate);

export {showAlert, showSuccessMessage, showFailMessage};
