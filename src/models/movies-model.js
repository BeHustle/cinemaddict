import {changeArrayElement} from '../utils/array';

export default class MoviesModel {
  constructor() {
    this._dataObservers = [];
    this._activeFilter = ``;
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

  onDataChange(cb) {
    this._dataObservers.push(cb);
  }

  _sortMovies(movies) {
    switch (this._activeSort) {
      case `date`:
        return movies.sort((a, b) => b.date.getTime() - a.date.getTime());
      case `rating`:
        return movies.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      default:
        return movies.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));
    }
  }

  getMovies() {
    if (this._activeFilter) {
      return this._sortMovies(this._movies.filter((movie) => movie[this._activeFilter]));
    }
    return this._sortMovies(this._movies);
  }

  setMovies(movies) {
    this._movies = movies;
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
    const newMovies = changeArrayElement(this._movies.slice(), movie, index);
    this.setMovies(newMovies);
  }
}
