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

  _getFiltersData() {
    this._films = this._moviesModel.getAllMovies();
    const getCountFilmsByFlag = (flag) => {
      if (!this._films) {
        return 0;
      }
      return flag ? this._films.filter((film) => film[flag]).length : this._films.length;
    };
    const getFilterCount = (title, flag = ``) => {
      return {
        title,
        flag,
        count: getCountFilmsByFlag(flag),
      };
    };

    return [
      getFilterCount(`All movies`),
      getFilterCount(`History`, `isWatched`),
      getFilterCount(`Watchlist`, `inWatchlist`),
      getFilterCount(`Favorites`, `isFavorite`),
    ];
  }

  _updateFilter(evt) {
    this._moviesModel.setFilter(evt.currentTarget.dataset.flag);
  }

  render() {
    const oldFilter = this._filter;
    this._filter = new Filter(this._getFiltersData(), this._moviesModel.getFilter());
    if (oldFilter) {
      replace(this._filter, oldFilter);
    } else {
      render(this._container, this._filter);
    }

    this._filter.onFilterChange(this._updateFilter.bind(this));
  }
}
