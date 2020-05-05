import AbstractComponent from './abstract-component';

export default class Filter extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  _getFiltersData() {
    const getFilterCount = (title, flag) => {
      return {
        title,
        count: this._films.filter((film) => film[flag]).length,
      };
    };

    return [
      getFilterCount(`History`, `isWatched`),
      getFilterCount(`Watchlist`, `inWatchlist`),
      getFilterCount(`Favorites`, `isFavorite`),
    ];
  }

  getTemplate() {
    const filtersData = this._getFiltersData();
    const initialFilter = `<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>`;
    const filters = filtersData.reduce((acc, cv) => {
      return acc + `<a href="#${cv.title}" class="main-navigation__item">${cv.title} <span class="main-navigation__item-count">${cv.count}</span></a>`;
    }, initialFilter);

    return (`<nav class="main-navigation">
      <div class="main-navigation__items">${filters}</div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`);
  }
}
