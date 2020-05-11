const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, component, place = `beforeend`) => {
  switch (place) {
    case `afterbegin`:
      container.prepend(component.getElement());
      break;
    case `beforeend`:
      container.append(component.getElement());
      break;
  }
};

const addCbToClickOnElement = (component, selector, cb) => {
  component.getElement().querySelector(selector).addEventListener(`click`, cb);
};

export {createElement, render, addCbToClickOnElement};
