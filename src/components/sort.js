import AbstractComponent from './abstract-component';
import {SortType} from '../constants';

const ACTIVE_SORT_CLASS = `sort__button--active`;

export default class Sort extends AbstractComponent {
  constructor(activeSort) {
    super();
    this._activeSort = activeSort;
  }

  getTemplate() {
    const initialSort = ``;
    const sorts = [SortType.BY_DEFAULT, SortType.BY_DATE, SortType.BY_RATING].reduce((acc, cv) => {
      return `${acc} <li><a href="#" data-sort="${cv}" class="sort__button ${cv === this._activeSort ? ACTIVE_SORT_CLASS : ``}">Sort by ${cv}</a></li>`;
    }, initialSort);
    return (`<ul class="sort">${sorts}</ul>`);
  }

  onSortChange(cb) {
    this
      .getElement()
      .querySelectorAll(`.sort__button`)
      .forEach((button) => {
        button.addEventListener(`click`, (evt) => {
          const sortType = evt.currentTarget.dataset.sort;
          evt.preventDefault();
          if (sortType !== this._activeSort) {
            cb(sortType);
          }
        });
      });
  }
}
