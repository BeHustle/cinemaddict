import AbstractComponent from './abstract-component';

export default class Footer extends AbstractComponent {
  constructor(countFilms) {
    super();
    this._countFilms = countFilms;
  }

  getTemplate() {
    const countFilmsTemplate = `<p>${this._countFilms} movies inside</p>`;
    return `<footer class="footer">
        <section class="footer__logo logo logo--smaller">Cinemaddict</section>
        <section class="footer__statistics">${countFilmsTemplate}</section>
    </footer>`;
  }
}
