import FilmCard from '../components/film-card';
import FilmPopup from '../components/film-popup';
import {render, replace} from '../utils/render';
import {ESCAPE_KEY} from '../constants';

const bodyElement = document.querySelector(`body`);
export default class MovieController {
  constructor(container, onDataChange, onViewChange, onCommentChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentChange = onCommentChange;
    this._closePopupOnEscape = this._closePopupOnEscape.bind(this);
  }

  _changeFlag(film, flag) {
    const newFilm = Object.assign({}, film);
    newFilm[flag] = !newFilm[flag];
    this._onDataChange(this, film, newFilm);
  }

  _setCommentUpdateHandler(film, popup) {
    popup.onCommentDelete((evt) => {
      const id = evt.currentTarget.dataset.comment;
      evt.preventDefault();
      this._onCommentChange(this, film, {id});
    });
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

  _closePopupOnEscape(evt) {
    if (evt.key === ESCAPE_KEY) {
      this.deleteFilmPopup();
    }
  }

  renderFilmPopup() {
    render(bodyElement, this._filmPopup);
  }

  deleteFilmPopup() {
    this._filmPopup.getElement().remove();
    this._isPopupOpened = false;
    document.removeEventListener(`keydown`, this._closePopupOnEscape);
  }

  setDefaultView() {
    this.deleteFilmPopup();
  }

  render(film, comments) {
    const createFilmPopup = () => {
      this._onViewChange();
      this.renderFilmPopup();
      this._filmPopup.onClosePopup(this.deleteFilmPopup.bind(this));
      this._setDataChangeHandlers(film, this._filmPopup);
      this._setCommentUpdateHandler(film, this._filmPopup);
      this._isPopupOpened = true;
      document.addEventListener(`keydown`, this._closePopupOnEscape);
    };

    if (this._filmCard && this._filmPopup) {
      const oldFilmCard = this._filmCard;
      const oldFilmPopup = this._filmPopup;
      this._filmCard = new FilmCard(film, comments.length);
      this._filmPopup = new FilmPopup(film, comments);
      replace(this._filmCard, oldFilmCard);
      this._filmCard.onShowPopup(createFilmPopup);
      this._setDataChangeHandlers(film, this._filmCard);

      replace(this._filmPopup, oldFilmPopup);
      if (this._isPopupOpened) {
        this._filmPopup.onClosePopup(this.deleteFilmPopup.bind(this));
        this._setDataChangeHandlers(film, this._filmPopup);
        this._setCommentUpdateHandler(film, this._filmPopup);
      }
    } else {
      this._filmCard = new FilmCard(film, comments.length);
      this._filmPopup = new FilmPopup(film, comments);
      this._setDataChangeHandlers(film, this._filmCard);
      this._filmCard.onShowPopup(createFilmPopup);
      render(this._container, this._filmCard);
    }
  }
}
