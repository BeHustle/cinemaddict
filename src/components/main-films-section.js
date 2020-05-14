import AbstractComponent from './abstract-component';

export default class MainFilmsSection extends AbstractComponent {
  constructor(title) {
    super();
    switch (title) {
      case `loading`:
        this._title = `<h2 class="films-list__title">Loading...</h2>`;
        break;
      case `no-data`:
        this._title = `<h2 class="films-list__title">There are no movies in our database</h2>`;
        break;
      default:
        this._title = `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
    }
  }

  getTemplate() {
    return (`<section class="films">
      <section class="films-list">
        ${this._title}
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
