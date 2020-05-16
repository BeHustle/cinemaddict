import {getRandomNumber} from '../utils/random';

export default class CommentsModel {
  constructor() {
    this._comments = {};
  }

  setComments(filmId, comments) {
    this._comments[filmId] = comments;
  }

  getCommentsByFilmId(filmId) {
    return this._comments[filmId];
  }

  _removeComment(filmId, commentId) {
    const index = this._comments[filmId].findIndex((it) => it.id === commentId);
    this._comments[filmId].splice(index, 1);
  }

  _addComment(filmId, comment) {
    comment.id = getRandomNumber(1, 100000);
    this._comments[filmId].push(comment);
  }

  updateComment(filmId, comment) {
    if (comment.id) {
      this._removeComment(filmId, comment.id);
    } else {
      this._addComment(filmId, comment);
    }
  }
}
