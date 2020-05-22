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
}
