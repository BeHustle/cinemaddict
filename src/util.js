const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const generateObjectsArray = (cb, count) => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(cb());
  }
  return array;
};

const getRandomNumber = (min, max, round = 1) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.ceil((rand) * round) / round;
};

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const shuffleArray = function (array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const getMonthName = (dateObject) => {
  const monthNames = [
    `January`, `February`, `March`, `April`, `May`, `June`,
    `July`, `August`, `September`, `October`, `November`, `December`,
  ];
  return monthNames[dateObject.getMonth()];
};

export {render, generateObjectsArray, getRandomNumber, getRandomArrayElement, getMonthName, shuffleArray};
