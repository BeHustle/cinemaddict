import Util from "../Util";

export default class MoreButton {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  getElement() {
    if (!this._element) {
      this._element = Util.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

