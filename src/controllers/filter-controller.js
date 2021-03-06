import {FilterType} from '../constants';
import AbstractComponent from '../components/abstract-component';
import Filter from '../components/filter';
import {render, replace} from '../utils/render';

export default class FilterController extends AbstractComponent {
  constructor(moviesModel, container) {
    super();
    this._moviesModel = moviesModel;
    this.render = this.render.bind(this);
    this._moviesModel.onDataChange(this.render);
    this._moviesModel.onMovieUpdateFilter(this.render);
    this._container = container;
  }

  _getCountFilmsByFilterType(filterType) {
    if (!this._films) {
      return 0;
    }
    return filterType ? this._films.filter((film) => film[filterType]).length : this._films.length;
  }

  _getFilterCount(title, filterType = ``) {
    return {
      title,
      filterType,
      count: this._getCountFilmsByFilterType(filterType),
    };
  }

  _getFiltersData() {
    this._films = this._moviesModel.getAllMovies();
    return [
      this._getFilterCount(`All movies`),
      this._getFilterCount(`History`, FilterType.WATCHED),
      this._getFilterCount(`Watchlist`, FilterType.WATCHLIST),
      this._getFilterCount(`Favorites`, FilterType.FAVORITE),
    ];
  }

  render() {
    const oldFilter = this._filter;
    this._filter = new Filter(this._getFiltersData(), this._moviesModel.getFilter());
    if (oldFilter) {
      replace(this._filter, oldFilter);
    } else {
      render(this._container, this._filter, `afterbegin`);
    }

    this._filter.onFilterChange(this._moviesModel.setFilter.bind(this._moviesModel));
  }
}
