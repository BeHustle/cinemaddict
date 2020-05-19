import {changeArrayElement} from '../utils/array';
import {LOADING_STATE, DONE_STATE} from '../constants';

export default class MoviesModel {
  constructor() {
    this._observers = [];
    this._activeFilter = ``;
    this._state = LOADING_STATE;
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._observers.forEach((cb) => cb());
  }

  getFilter() {
    return this._activeFilter;
  }

  onDataChange(cb) {
    this._observers.push(cb);
  }

  getState() {
    return this._state;
  }

  getMovies() {
    if (this._activeFilter) {
      return this._movies.filter((movie) => movie[this._activeFilter]);
    }
    return this._movies;
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
    this._observers.forEach((cb) => cb());
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
}
