import {changeArrayElement} from '../utils/array';

export default class Movies {
  constructor() {
    this._observers = [];
  }

  setFilter(filter) {
    this._activeFilter = filter;
    this._observers.forEach((cb) => cb());
  }

  getFilter() {
    return this._activeFilter;
  }

  addObserver(cb) {
    this._observers.push(cb);
  }

  getMovies() {
    if (this._activeFilter) {
      return this._movies.filter((movie) => movie[this._activeFilter]);
    }
    return this._movies;
  }

  setMovies(movies) {
    this._movies = movies;
    this._activeFilter = ``;
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
  }
}
