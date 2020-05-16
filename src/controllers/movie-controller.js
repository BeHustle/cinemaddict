import FilmCard from '../components/film-card';
import FilmPopup from '../components/film-popup';
import {render, replace} from '../utils/render';
import {ENTER_KEY, ESCAPE_KEY} from '../constants';

const bodyElement = document.querySelector(`body`);
export default class MovieController {
  constructor(container, onDataChange, onViewChange, onCommentChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentChange = onCommentChange;
    this._closePopupOnEscape = this._closePopupOnEscape.bind(this);
    this._submitCommentOnCtrlEnter = this._submitCommentOnCtrlEnter.bind(this);
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

  _submitCommentOnCtrlEnter(keyEvt) {
    if (keyEvt.ctrlKey && keyEvt.key === ENTER_KEY) {
      this._filmPopup.submitCommentForm((comment) => {
        if (comment.emoji && comment.text) {
          comment.author = `Vlad`;
          comment.date = new Date();
          this._onCommentChange(this, this._film, comment);
        }
      });
    }
  }

  renderFilmPopup() {
    render(bodyElement, this._filmPopup);
  }

  deleteFilmPopup() {
    this._filmPopup.getElement().remove();
    this._isPopupOpened = false;
    document.removeEventListener(`keydown`, this._closePopupOnEscape);
    document.removeEventListener(`keydown`, this._submitCommentOnCtrlEnter);
  }

  setDefaultView() {
    this.deleteFilmPopup();
  }

  render(film, comments) {
    this._film = film;
    this._comments = comments;
    const createFilmPopup = () => {
      this._onViewChange();
      this.renderFilmPopup();
      this._filmPopup.onClosePopup(this.deleteFilmPopup.bind(this));
      this._setDataChangeHandlers(this._film, this._filmPopup);
      this._setCommentUpdateHandler(this._film, this._filmPopup);
      this._isPopupOpened = true;
      document.addEventListener(`keydown`, this._closePopupOnEscape);
      document.addEventListener(`keydown`, this._submitCommentOnCtrlEnter);
    };

    if (this._filmCard && this._filmPopup) {
      const oldFilmCard = this._filmCard;
      const oldFilmPopup = this._filmPopup;
      this._filmCard = new FilmCard(this._film, this._comments.length);
      this._filmPopup = new FilmPopup(this._film, this._comments);
      replace(this._filmCard, oldFilmCard);
      this._filmCard.onShowPopup(createFilmPopup);
      this._setDataChangeHandlers(this._film, this._filmCard);

      replace(this._filmPopup, oldFilmPopup);
      if (this._isPopupOpened) {
        this._filmPopup.onClosePopup(this.deleteFilmPopup.bind(this));
        this._setDataChangeHandlers(this._film, this._filmPopup);
        this._setCommentUpdateHandler(this._film, this._filmPopup);
      }
    } else {
      this._filmCard = new FilmCard(this._film, this._comments.length);
      this._filmPopup = new FilmPopup(this._film, this._comments);
      this._setDataChangeHandlers(this._film, this._filmCard);
      this._filmCard.onShowPopup(createFilmPopup);
      render(this._container, this._filmCard);
    }
  }
}
