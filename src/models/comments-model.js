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
    if (index === -1) {
      return;
    }
    const newComments = this.getComments();
    newComments.splice(index, 1);
    this.setComments(newComments);
    this._dataObservers.forEach((cb) => cb());
  }

  addComment(comment) {
    const newComments = this.getComments();
    newComments.push(comment);
    this.setComments(newComments);
    this._dataObservers.forEach((cb) => cb());
  }
}
