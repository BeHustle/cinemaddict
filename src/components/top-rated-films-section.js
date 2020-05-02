import {createElement} from "../util";

export default class TopRatedFilmsSection {
  getTemplate() {
    return (`<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container" id="top-rated">
      </div>
    </section>`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
