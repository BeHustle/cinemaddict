import FilmCard from '../components/film-card';
import FilmPopup from '../components/film-popup';
import CommentsModel from '../models/comments-model';
import {render, replace} from '../utils/render';
import {getRandomComments} from '../films-data';
import {ESCAPE_KEY} from '../constants';
import {getRandomNumber} from '../utils/random';

const bodyElement = document.querySelector(`body`);
export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._closePopupOnEscape = this._closePopupOnEscape.bind(this);

    this._commentsModel = new CommentsModel();
    this._commentsModel.setComments(getRandomComments());
    this._commentsModel.onDataChange(this.rerender.bind(this));
  }

  _changeFlag(film, flag) {
    const newFilm = Object.assign({}, film);
    newFilm[flag] = !newFilm[flag];
    this._onDataChange(this, film, newFilm);
  }

  _setCommentDeleteHandler(popup) {
    popup.onCommentDelete((evt) => {
      const id = parseInt(evt.currentTarget.dataset.comment, 10);
      evt.preventDefault();
      this._commentsModel.removeComment(id);
    });
  }

  _addComment(comment) {
    if (comment.emoji && comment.text) {
      const newComment = Object.assign({}, comment);
      newComment.id = getRandomNumber(1, 100000);
      newComment.author = `Vlad`;
      newComment.date = new Date();
      this._commentsModel.addComment(newComment);
    }
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

  render(film) {
    const createFilmPopup = () => {
      this._onViewChange();
      this.renderFilmPopup();
      this._filmPopup.onClosePopup(this.deleteFilmPopup.bind(this));
      this._filmPopup.onCommentsFormSubmit(this._addComment.bind(this));
      this._setDataChangeHandlers(this._film, this._filmPopup);
      this._setCommentDeleteHandler(this._filmPopup);
      this._isPopupOpened = true;
      document.addEventListener(`keydown`, this._closePopupOnEscape);
    };

    this._film = film;
    const oldFilmCard = this._filmCard;
    const oldFilmPopup = this._filmPopup;
    this._filmCard = new FilmCard(this._film, this._commentsModel.getCommentsCount());
    this._filmPopup = new FilmPopup(this._film, this._commentsModel.getComments());
    this._filmCard.onShowPopup(createFilmPopup);
    this._setDataChangeHandlers(this._film, this._filmCard);

    if (oldFilmCard && oldFilmPopup) {
      replace(this._filmCard, oldFilmCard);
      replace(this._filmPopup, oldFilmPopup);
      if (this._isPopupOpened) {
        this._filmPopup.onClosePopup(this.deleteFilmPopup.bind(this));
        this._filmPopup.onCommentsFormSubmit(this._addComment.bind(this));
        this._setDataChangeHandlers(this._film, this._filmPopup);
        this._setCommentDeleteHandler(this._filmPopup);
      }
    } else {
      render(this._container, this._filmCard);
    }
  }

  rerender() {
    this.render(this._film);
  }
}
