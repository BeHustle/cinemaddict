import AbstractComponent from './abstract-component';

export default class AbstractSmartComponent extends AbstractComponent {
  addCbToClickOnElement(selector, cb) {
    this.getElement().querySelector(selector).addEventListener(`click`, cb);
  }
}
