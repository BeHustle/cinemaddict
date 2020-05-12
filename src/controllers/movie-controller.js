import FilmCard from '../components/film-card';
import FilmPopup from '../components/film-popup';
import {render, replace} from '../utils/render';

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

  _setDataChangeHandlersOnCard(film, component) {
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

  _setDataChangeHandlersOnPopup(film, component) {
    component.onAddToWatchlist(() => {
      this._changeFlag(film, `inWatchlist`);
    });
    component.onMarkAsWatched(() => {
      this._changeFlag(film, `isWatched`);
    });
    component.onMarkAsFavorite(() => {
      this._changeFlag(film, `isFavorite`);
    });
  }

  renderFilmPopup() {
    render(bodyElement, this._filmPopup);
  }

  deleteFilmPopup() {
    this._filmPopup.getElement().remove();
    this._isPopupOpened = false;
  }

  setDefaultView() {
    this.deleteFilmPopup();
  }

  render(film) {
    const createFilmPopup = () => {
      this._onViewChange();
      this.renderFilmPopup();
      this._filmPopup.onClosePopup(this.deleteFilmPopup.bind(this));
      this._setDataChangeHandlersOnPopup(film, this._filmPopup);
      this._isPopupOpened = true;
    };

    if (this._filmCard && this._filmPopup) {
      const oldFilmCard = this._filmCard;
      this._filmCard = new FilmCard(film);
      if (!this._isPopupOpened) {
        this._filmPopup = new FilmPopup(film);
      }
      this._setDataChangeHandlersOnCard(film, this._filmCard);
      this._filmCard.onShowPopup(createFilmPopup);
      replace(this._filmCard, oldFilmCard);
    } else {
      this._filmCard = new FilmCard(film);
      this._filmPopup = new FilmPopup(film);
      this._setDataChangeHandlersOnCard(film, this._filmCard);
      this._filmCard.onShowPopup(createFilmPopup);
      render(this._container, this._filmCard);
    }
  }
}
