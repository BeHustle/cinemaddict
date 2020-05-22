export default class CommentModel {
  constructor(data) {
    this.id = parseInt(data.id, 10);
    this.author = data.author;
    this.text = data.comment;
    this.emoji = data.emotion;
    this.date = new Date(data.date);
  }

  static toRAW(data) {
    return {
      "comment": data.text,
      "emotion": data.emoji,
      "date": data.date.toJSON()
    };
  }

  static parseComment(data) {
    return new CommentModel(data);
  }

  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }
}
