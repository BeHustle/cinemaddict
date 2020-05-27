import MovieModel from '../models/movie-model';
import CommentModel from '../models/comment-model';

const isOnline = () => {
  return window.navigator.onLine;
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    if (isOnline()) {
      return this._api.getMovies()
        .then((movies) => {
          const items = createStoreStructure(movies.map((movie) => movie.toRAW()));
          this._store.setMovies(items);
          return movies;
        });
    }
    return Promise.resolve(MovieModel.parseMovies(this._store.getMovies()));
  }

  getComments(filmId) {
    if (isOnline()) {
      return this._api.getComments(filmId)
        .then((comments) => {
          const items = createStoreStructure(comments.map((comment) => comment.toJSON()));
          this._store.setComments(items);
          return comments;
        });
    }
    return Promise.resolve(CommentModel.parseComments(this._store.getComments(filmId)));
  }

  updateMovie(id, data) {
    if (isOnline()) {
      return this._api.updateMovie(id, data)
        .then((newMovie) => {
          this._store.setMovie(newMovie.id, newMovie.toRAW());
          return newMovie;
        });
    }

    const localMovie = MovieModel.clone(data);
    this._store.setMovie(id, localMovie.toRAW());
    return Promise.resolve(localMovie);
  }

  sync() {
    if (isOnline()) {
      return this._api.sync(this._store.getMovies())
        .then((response) => {
          const items = createStoreStructure(response.updated);
          this._store.setMovies(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
