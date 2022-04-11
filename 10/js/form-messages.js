const isEscapeKey = (evt) => evt.key === 'Escape';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const showMessage = (template) => {
  const message =  template.cloneNode(true);

  const removeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onEscKeydown);
  };

  function onEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage(message);
    }
  }

  message.addEventListener('click', () => removeMessage(message));
  document.addEventListener('keydown', onEscKeydown);
  document.body.append(message);
};


const showSuccessMessage = () => showMessage(successTemplate);
const showFailMessage = () => showMessage(errorTemplate);

export {showSuccessMessage, showFailMessage};
