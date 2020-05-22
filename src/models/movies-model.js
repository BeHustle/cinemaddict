import {changeArrayElement} from '../utils/array';
import {
  DONE_STATE,
  LOADING_STATE,
  NO_DATA_STATE,
  MOST_COMMENTED_FILMS_COUNT,
  TOP_RATED_FILMS_COUNT
} from '../constants';

export default class MoviesModel {
  constructor() {
    this._dataLoadObservers = [];
    this._filterChangeObservers = [];
    this._sortChangeObservers = [];
    this._activeFilter = ``;
    this._state = LOADING_STATE;
    this._activeSort = `default`;
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._filterChangeObservers.forEach((cb) => cb());
  }

  getActiveSort() {
    return this._activeSort;
  }

  setNoData() {
    this._state = NO_DATA_STATE;
    this._dataLoadObservers.forEach((cb) => cb());
  }

  updateSort(type) {
    this._activeSort = type;
    this._sortChangeObservers.forEach((cb) => cb());
  }

  getFilter() {
    return this._activeFilter;
  }

  getState() {
    return this._state;
  }

  onDataLoad(cb) {
    this._dataLoadObservers.push(cb);
  }

  onFilterChange(cb) {
    this._filterChangeObservers.push(cb);
  }

  onSortChange(cb) {
    this._sortChangeObservers.push(cb);
  }

  _sortMovies(movies) {
    switch (this._activeSort) {
      case `date`:
        return movies.sort((a, b) => b.date.getTime() - a.date.getTime());
      case `rating`:
        return movies.sort((a, b) => b.rating * 10 - a.rating * 10);
      default:
        return movies.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
    }
  }

  getMovies() {
    if (this._activeFilter) {
      return this._sortMovies(this._movies.filter((movie) => movie[this._activeFilter]));
    }
    return this._sortMovies(this._movies);
  }

  getAllMovies() {
    return this._movies;
  }

  getCountMovies() {
    return this._movies ? this._movies.length : 0;
  }

  setMovies(movies) {
    this._movies = movies;
    this._state = DONE_STATE;
    this._dataLoadObservers.forEach((cb) => cb());
  }

  getTopRatedMovies() {
    if (!this._movies || this._movies.length === 0) {
      return null;
    }
    if (this._movies.every((movie) => movie.rating === 0)) {
      return null;
    }
    return this._movies.slice().sort((a, b) => b.rating * 10 - a.rating * 10).slice(0, TOP_RATED_FILMS_COUNT);
  }

  getMostCommentedMovies() {
    if (!this._movies || this._movies.length === 0) {
      return null;
    }
    if (this._movies.every((movie) => movie.getCommentsCount() === 0)) {
      return null;
    }
    return this._movies.slice().sort((a, b) => b.getCommentsCount() * 10 - a.getCommentsCount() * 10).slice(0, MOST_COMMENTED_FILMS_COUNT);
  }

  getMovie(id) {
    const index = this._movies.findIndex((it) => it.id === id);
    return this._movies[index];
  }

  setMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }
    this._movies = changeArrayElement(this._movies, movie, index);
    if (this._activeFilter && !movie[this._activeFilter]) {
      this._filterChangeObservers.forEach((cb) => cb());
    }
  }
}
