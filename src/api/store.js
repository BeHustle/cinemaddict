export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  _getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  _updateStore(newStore) {
    this._storage.setItem(this._storeKey, JSON.stringify(newStore));
  }

  setComments(comments) {
    const store = this._getItems();
    store.comments = Object.assign({}, store.comments, comments);
    this._updateStore(store);
  }

  setMovies(movies) {
    const store = this._getItems();
    store.movies = Object.assign({}, store.movies, movies);
    this._updateStore(store);
  }

  setMovie(id, movie) {
    const store = this._getItems();
    store.movies[id] = movie;
    this._updateStore(store);
  }

  getComments(filmId) {
    const commentsStore = this._getItems().comments;
    const filmComments = this._getItems().movies[filmId].comments;
    return filmComments
      .filter((commentId) => commentsStore[commentId])
      .map((commentId) => commentsStore[commentId]);
  }

  getMovies() {
    return Object.values(this._getItems().movies);
  }
}
