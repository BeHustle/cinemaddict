const changeArrayElement = (array, element, index) => {
  return [].concat(array.slice(0, index), element, array.slice(index + 1));
};

export {changeArrayElement};
