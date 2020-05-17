export default class CommentsModel {
  constructor() {
    this._comments = [];
    this._dataObservers = [];
  }

  onDataChange(cb) {
    this._dataObservers.push(cb);
  }

  setComments(comments) {
    this._comments = comments;
  }

  getCommentsCount() {
    return this._comments.length;
  }

  getComments() {
    return this._comments;
  }

  removeComment(commentId) {
    const index = this._comments.findIndex((it) => it.id === commentId);
    this._comments.splice(index, 1);
    this._dataObservers.forEach((cb) => cb());
  }

  addComment(comment) {
    this._comments.push(comment);
    this._dataObservers.forEach((cb) => cb());
  }
}
