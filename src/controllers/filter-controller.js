import AbstractComponent from '../components/abstract-component';
import Filter from '../components/filter';
import {render, replace} from '../utils/render';

export default class FilterController extends AbstractComponent {
  constructor(moviesModel, container) {
    super();
    this._moviesModel = moviesModel;
    this._moviesModel.onDataChange(this.render.bind(this));
    this._container = container;
  }

  _getCountFilmsByFlag(flag) {
    if (!this._films) {
      return 0;
    }
    return flag ? this._films.filter((film) => film[flag]).length : this._films.length;
  }

  _getFilterCount(title, flag = ``) {
    return {
      title,
      flag,
      count: this._getCountFilmsByFlag(flag),
    };
  }

  _getFiltersData() {
    this._films = this._moviesModel.getAllMovies();
    return [
      this._getFilterCount(`All movies`),
      this._getFilterCount(`History`, `isWatched`),
      this._getFilterCount(`Watchlist`, `inWatchlist`),
      this._getFilterCount(`Favorites`, `isFavorite`),
    ];
  }

  render() {
    const oldFilter = this._filter;
    this._filter = new Filter(this._getFiltersData(), this._moviesModel.getFilter());
    if (oldFilter) {
      replace(this._filter, oldFilter);
    } else {
      render(this._container, this._filter);
    }

    this._filter.onFilterChange(this._moviesModel.setFilter.bind(this._moviesModel));
  }
}
