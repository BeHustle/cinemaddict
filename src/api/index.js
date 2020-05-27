import MovieModel from '../models/movie-model';
import CommentModel from '../models/comment-model';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

export default class API {
  constructor(url, key) {
    this._URL = url;
    this._API_KEY = key;
  }

  getMovies() {
    return this._load({path: `movies`})
      .then((response) => response.json())
      .then(MovieModel.parseMovies);
  }

  getComments(filmId) {
    return this._load({path: `comments/${filmId}`})
      .then((response) => response.json())
      .then(CommentModel.parseComments);
  }

  deleteComment(id) {
    return this._load({path: `comments/${id}`, method: Method.DELETE});
  }

  addComment(filmId, data) {
    return this._load({
      path: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    });
  }

  updateMovie(id, data) {
    return this._load({
      path: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(MovieModel.parseMovie);
  }

  sync(data) {
    return this._load({
      path: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  _load({path, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._API_KEY);

    return fetch(`${this._URL}/${path}`, {method, body, headers})
      .then(this._checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
