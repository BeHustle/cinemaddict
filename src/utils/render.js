import {FILMCARD_DESCRIPTION_LENGTH} from '../constants';

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

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const descriptionSlice = (string) => {
  return string.length > FILMCARD_DESCRIPTION_LENGTH
    ? `${string.substr(0, FILMCARD_DESCRIPTION_LENGTH - 1)}…`
    : string;
};

export {createElement, render, replace, descriptionSlice};
