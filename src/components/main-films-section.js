import AbstractComponent from './abstract-component';
import {State} from '../constants';

export default class MainFilmsSection extends AbstractComponent {
  constructor(dataState) {
    super();
    this._dataState = dataState;
  }

  _getTitle() {
    switch (this._dataState) {
      case State.LOADING:
        return `<h2 class="films-list__title">Loading...</h2>`;
      case State.NO_DATA:
        return `<h2 class="films-list__title">There are no movies in our database</h2>`;
      default:
        return `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
    }
  }

  getTemplate() {
    return (`<section class="films">
      <section class="films-list">
        ${this._getTitle()}
        <div class="films-list__container"></div>
       </section>
    </section>`);
  }

  getFilmsList() {
    return this.getElement().querySelector(`.films-list`);
  }

  getFilmsListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
