import FilmCard from '../components/film-card';
import FilmPopup from '../components/film-popup';
import {render} from '../utils/render';

const bodyElement = document.querySelector(`body`);
export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  _changeFlag(film, flag) {
    const newFilm = Object.assign({}, film);
    newFilm[flag] = !newFilm[flag];
    this._onDataChange(this, film, newFilm);
  }

  _setDataChangeHandlers(film, component) {
    component.onAddToWatchlist((evt) => {
      this._changeFlag(film, `inWatchlist`);
      evt.preventDefault();
    });
    component.onMarkAsWatched((evt) => {
      this._changeFlag(film, `isWatched`);
      evt.preventDefault();
    });
    component.onMarkAsFavorite((evt) => {
      this._changeFlag(film, `isFavorite`);
      evt.preventDefault();
    });
  }

  renderFilmPopup() {
    render(bodyElement, this._filmPopup);
  }

  deleteFilmPopup() {
    this._filmPopup.getElement().remove();
  }

  setDefaultView() {
    this.deleteFilmPopup();
  }

  render(film) {
    const createFilmPopup = () => {
      this._onViewChange();
      this.renderFilmPopup();
      this._filmPopup.onClosePopup(this.deleteFilmPopup.bind(this));
      this._setDataChangeHandlers(film, this._filmPopup);
    };

    if (this._filmCard && this._filmPopup) {
      this._filmCard.changeFlags(film);
      this._filmPopup.changeFlags(film);
      this._setDataChangeHandlers(film, this._filmCard);
      this._setDataChangeHandlers(film, this._filmPopup);
      this._filmCard.rerender();
      this._filmCard.onShowPopup(createFilmPopup);
      this._filmPopup.rerender();
    } else {
      this._filmCard = new FilmCard(film);
      this._filmPopup = new FilmPopup(film);
      this._setDataChangeHandlers(film, this._filmCard);
      this._filmCard.onShowPopup(createFilmPopup);
      render(this._container, this._filmCard);
    }
  }
}
