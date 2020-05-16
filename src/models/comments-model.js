export default class CommentsModel {
  constructor() {
    this._comments = {};
  }

  setComments(filmId, comments) {
    this._comments[filmId] = comments;
  }

  getComments(filmId) {
    return this._comments[filmId];
  }

  removeComment(filmId, commentId) {
    const index = this._comments[filmId].findIndex((it) => it.id === commentId);
    this._comments[filmId].splice(index, 1);
  }

  addComment(filmId, comment) {
    this._comments[filmId].push(comment);
  }
}
