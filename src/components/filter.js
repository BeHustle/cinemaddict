import AbstractSmartComponent from './abstract-smart-component';

export default class Filter extends AbstractSmartComponent {
  constructor(filtersData, activeFilter) {
    super();
    this._filtersData = filtersData;
    this._activeFilter = activeFilter;
  }

  getTemplate() {
    const initialFilter = ``;
    const filters = this._filtersData.reduce((acc, cv) => {
      return `${acc} <a href="#${cv.title}" data-flag="${cv.flag}" class="main-navigation__item ${this._activeFilter === cv.flag ? `main-navigation__item--active` : ``}">${cv.title} <span class="main-navigation__item-count">${cv.count}</span></a>`;
    }, initialFilter);

    return (`<div class="main-navigation__items">${filters}</div>`);
  }

  onFilterChange(cb) {
    this
      .getElement()
      .querySelectorAll(`.main-navigation__item`)
      .forEach((item) => {
        item.addEventListener(`click`, (evt) => {
          cb(evt.currentTarget.dataset.flag);
        });
      });
  }
}
