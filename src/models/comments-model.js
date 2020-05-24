export default class CommentsModel {
  constructor() {
    this._comments = [];
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
