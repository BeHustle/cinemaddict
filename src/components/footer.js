import AbstractComponent from './abstract-component';

export default class Footer extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    const countFilms = `<p>${this._films.length} movies inside</p>`;
    return `<footer class="footer">
        <section class="footer__logo logo logo--smaller">Cinemaddict</section>
        <section class="footer__statistics">${countFilms}</section>
    </footer>`;
  }
}
