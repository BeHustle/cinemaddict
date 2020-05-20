import AbstractComponent from './abstract-component';

const ACTIVE_SORT_CLASS = `sort__button--active`;

export default class Sort extends AbstractComponent {
  constructor(activeSort) {
    super();
    this._activeSort = activeSort;
  }

  getTemplate() {
    const initialSort = ``;
    const sorts = [`default`, `date`, `rating`].reduce((acc, cv) => {
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
          evt.preventDefault();
          cb(evt.currentTarget.dataset.sort);
        });
      });
  }
}
