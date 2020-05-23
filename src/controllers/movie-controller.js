import {ESCAPE_KEY, URL, API_KEY} from '../constants';
import {render, replace} from '../utils/render';
import API from '../api';
import FilmCard from '../components/film-card';
import FilmPopup from '../components/film-popup';
import CommentsModel from '../models/comments-model';
import MovieModel from '../models/movie-model';
import CommentModel from '../models/comment-model';

const bodyElement = document.querySelector(`body`);
export default class MovieController {
  constructor(container, onDataChange, onViewChange, onCommentsUpdate) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentsUpdate = onCommentsUpdate;
    this._api = new API(URL, API_KEY);

    this._closePopupOnEscape = this._closePopupOnEscape.bind(this);

    this._commentsModel = new CommentsModel();
  }

  _changeFlag(film, flag) {
    const newFilm = MovieModel.clone(film);
    newFilm[flag] = !newFilm[flag];
    this._onDataChange(this, film, newFilm);
  }

  _setCommentDeleteHandler() {
    this._filmPopup.onCommentDelete((evt) => {
      const id = parseInt(evt.currentTarget.dataset.comment, 10);
      this._filmPopup.setCommentDeleting(evt);
      this._api.deleteComment(id)
        .then(() => {
          this._updateComments();
          this._onCommentsUpdate();
        })
        .catch(() => {
          this._filmPopup.setErrorDuringDeleting(evt);
        });
    });
  }

  _addComment(comment) {
    if (comment.emoji && comment.text) {
      this._filmPopup.setCommentAdding();
      const newComment = CommentModel.toRAW({
        text: comment.text,
        emoji: comment.emoji,
        date: new Date(),
      });
      this._api.addComment(this._film.id, newComment).then(() => {
        this._updateComments();
        this._onCommentsUpdate();
        this._filmPopup.onSuccessCommentAdd();
      }).catch(() => {
        this._filmPopup.onErrorCommentAdd();
      });
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

  _setPopupHandlers() {
    this._filmPopup.onClosePopup(this.deleteFilmPopup.bind(this));
    this._filmPopup.onCommentsFormSubmit(this._addComment.bind(this));
    this._setDataChangeHandlers(this._film, this._filmPopup);
    this._setCommentDeleteHandler(this._filmPopup);
  }

  _updateComments() {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._film.setComments(comments.map((item) => item.id.toString()));
        this._filmPopup.updateComments(this._commentsModel.getComments());
        this._filmCard.updateCountComments(this._film.getCommentsCount());
      });
  }

  render(film) {
    const createFilmPopup = () => {
      this._onViewChange();
      this.renderFilmPopup();
      this._setPopupHandlers();
      this._isPopupOpened = true;
      document.addEventListener(`keydown`, this._closePopupOnEscape);
    };
    this._film = film;
    const oldFilmCard = this._filmCard;
    this._filmCard = new FilmCard(this._film);
    this._setDataChangeHandlers(this._film, this._filmCard);
    if (oldFilmCard) {
      replace(this._filmCard, oldFilmCard);
    } else {
      render(this._container, this._filmCard);
    }

    const oldFilmPopup = this._filmPopup;
    this._filmPopup = new FilmPopup(this._film);
    this._filmCard.onShowPopup(createFilmPopup);
    if (oldFilmPopup) {
      replace(this._filmPopup, oldFilmPopup);
      if (this._isPopupOpened) {
        this._setPopupHandlers();
      }
    }
    this._updateComments();
  }
}
