

export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setComments(comments) {
    const store = this.getItems();
    store.comments = Object.assign({}, store.comments, comments);
    this._storage.setItem(this._storeKey, JSON.stringify(store));
  }

  setMovies(movies) {
    const store = this.getItems();
    store.movies = Object.assign({}, store.movies, movies);
    this._storage.setItem(this._storeKey, JSON.stringify(store));
  }

  setMovie(id, movie) {
    const store = this.getItems();
    store.movies[id] = movie;
    this._storage.setItem(this._storeKey, JSON.stringify(store));
  }

  getComments(filmId) {
    const commentsStore = this.getItems().comments;
    const filmComments = this.getItems().movies[filmId].comments;
    const comments = [];
    filmComments.forEach((commentId) => {
      if (commentsStore[commentId]) {
        comments.push(commentsStore[commentId]);
      }
    });
    return comments;
  }

  getMovies() {
    return Object.values(this.getItems().movies);
  }
}
