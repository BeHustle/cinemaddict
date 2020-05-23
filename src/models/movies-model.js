import {changeArrayElement} from '../utils/array';
import {LOADING_STATE, DONE_STATE} from '../constants';

export default class MoviesModel {
  constructor() {
    this._dataObservers = [];
    this._activeFilter = ``;
    this._state = LOADING_STATE;
    this._activeSort = `default`;
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._dataObservers.forEach((cb) => cb());
  }

  getActiveSort() {
    return this._activeSort;
  }

  updateSort(type) {
    this._activeSort = type;
    this._dataObservers.forEach((cb) => cb());
  }

  getFilter() {
    return this._activeFilter;
  }

  getState() {
    return this._state;
  }

  onDataChange(cb) {
    this._dataObservers.push(cb);
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
    this._dataObservers.forEach((cb) => cb());
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
    const newMovies = changeArrayElement(this._movies, movie, index);
    this.setMovies(newMovies);
  }

  getWatchedMoviesFromDate(date) {
    if (!this._movies) {
      return [];
    }
    return this._movies.slice().filter((movie) => movie.isWatched && (movie.watchingDate.getTime() > date.getTime()));
  }
}
