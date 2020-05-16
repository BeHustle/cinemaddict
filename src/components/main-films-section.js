import AbstractComponent from './abstract-component';

export default class MainFilmsSection extends AbstractComponent {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    let title = `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
    switch (this._title) {
      case `loading`:
        title = `<h2 class="films-list__title">Loading...</h2>`;
        break;
      case `no-data`:
        title = `<h2 class="films-list__title">There are no movies in our database</h2>`;
        break;
      default:
        break;
    }
    return (`<section class="films">
      <section class="films-list">
        ${title}
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
