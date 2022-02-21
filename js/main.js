function getRandomInteger (min, max) {
  if (min >= 0 && max > 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (max >= min) {
    return min;
  }

  return('Задан неверный диапазон! Укажите другие числа.');
}

getRandomInteger (0, 100);

function getRandomFraction (min, max, decimalPlaces) {
  if (min >= 0 && max > 0 && min < max) {
    return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
  }

  if (max >= min) {
    return min.toFixed(decimalPlaces);
  }

  return('Задан неверный диапазон! Укажите другие числа.');
}

getRandomFraction (0, 100, 5);
