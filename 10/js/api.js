const ServerAddress = {
  SEND_DATA_API: 'https://25.javascript.pages.academy/keksobooking',
  GET_DATA_API: 'https://25.javascript.pages.academy/keksobooking/data'
};


const getData = (onSuccess, onError) => {
  fetch(ServerAddress.GET_DATA_API)
    .then((response) => response.json())
    .then((similarAds) => {
      onSuccess(similarAds);
    })
    .catch(() => {
      onError('Не удалось получить данные с сервера. Обновите страницу');
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    ServerAddress.SEND_DATA_API,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onError('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
