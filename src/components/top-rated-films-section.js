import AbstractComponent from './abstract-component';

export default class TopRatedFilmsSection extends AbstractComponent {
  getTemplate() {
    return (`<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container" id="top-rated">
      </div>
    </section>`);
  }

  getFilmsListContainer() {
    return this.getElement().querySelector(`.films-list__container`);
  }
}
