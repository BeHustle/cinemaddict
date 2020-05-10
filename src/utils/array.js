const shuffleArray = (array) => {
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

const pushAfterIndex = (array, element, index) => {
  return [].concat(array.slice(0, index), element, array.slice(index + 1));
};

export {shuffleArray, pushAfterIndex};
