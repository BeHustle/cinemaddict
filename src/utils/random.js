const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min, max, round = 1) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round((rand) * round) / round;
};

const getRandomBoolean = () => {
  return getRandomArrayElement([true, false]);
};

export {getRandomNumber, getRandomBoolean, getRandomArrayElement};