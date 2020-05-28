import {ESCAPE_KEY, URL, API_KEY, FilterType, STORE_NAME} from '../constants';
import {render, replace} from '../utils/render';
import API from '../api';
import FilmCard from '../components/film-card';
import FilmPopup from '../components/film-popup';
import CommentsModel from '../models/comments-model';
import MovieModel from '../models/movie-model';
import CommentModel from '../models/comment-model';
import Store from '../api/store';
import Provider from '../api/provider';

const api = new API(URL, API_KEY);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const bodyElement = document.querySelector(`body`);
export default class MovieController {
  constructor(container, onDataChange, onViewChange, onCommentsUpdate) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onCommentsUpdate = onCommentsUpdate;

    this._closePopupOnEscape = this._closePopupOnEscape.bind(this);

    this._commentsModel = new CommentsModel();
  }

  _changeFilterType(film, filterType) {
    const newFilm = MovieModel.clone(film);
    newFilm[filterType] = !newFilm[filterType];
    if (filterType === FilterType.WATCHED && newFilm.filterType) {
      newFilm.watchingDate = new Date();
    }
    this._onDataChange(this, film, newFilm, filterType);
  }

  _setCommentDeleteHandler() {
    this._filmPopup.onCommentDelete((evt) => {
      const commentId = parseInt(evt.currentTarget.dataset.comment, 10);
      this._filmPopup.setCommentDeleting(evt);
      api.deleteComment(commentId)
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
      api.addComment(this._film.id, newComment).then(() => {
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
      this._changeFilterType(film, FilterType.WATCHLIST);
      evt.preventDefault();
    });
    component.onMarkAsWatched((evt) => {
      this._changeFilterType(film, FilterType.WATCHED);
      evt.preventDefault();
    });
    component.onMarkAsFavorite((evt) => {
      this._changeFilterType(film, FilterType.FAVORITE);
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

  disableComments() {
    this._filmPopup.disableComments();
  }

  enableComments() {
    this._filmPopup.enableComments();
  }

  _setPopupHandlers() {
    this._filmPopup.onClosePopup(this.deleteFilmPopup.bind(this));
    this._filmPopup.onCommentsFormSubmit(this._addComment.bind(this));
    this._setDataChangeHandlers(this._film, this._filmPopup);
    this._setCommentDeleteHandler(this._filmPopup);
  }

  _updateComments() {
    apiWithProvider.getComments(this._film.id)
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
