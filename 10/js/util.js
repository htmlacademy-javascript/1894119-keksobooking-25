const getRandomInteger = (min, max) => {
  if (min >= 0 && max > 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (max >= min) {
    return min;
  }

  return ('Задан неверный диапазон! Укажите другие числа.');
};

const getRandomFraction = (min, max, decimalPlaces) => {
  if (min >= 0 && max > 0 && min < max) {
    return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
  }

  if (max >= min) {
    return min.toFixed(decimalPlaces);
  }

  return ('Задан неверный диапазон! Укажите другие числа.');
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArray = (array) => array.slice(0, getRandomInteger(1, array.length - 1));

export {getRandomInteger, getRandomFraction, getRandomArrayElement, getRandomArray};
