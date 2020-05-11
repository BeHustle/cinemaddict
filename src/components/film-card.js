import {getFormatDuration} from '../utils/date-time';
import {addCbToClickOnElement} from '../utils/render';
import AbstractSmartComponent from './abstract-smart-component';

const CONTROLS_ACTIVE_BTN_CLASS = `film-card__controls-item--active`;

export default class FilmCard extends AbstractSmartComponent {
  constructor(film) {
    super();
    this.film = film;
  }

  changeFlags(newFilm) {
    if (!(this.film.isFavorite === newFilm.isFavorite)) {
      this.film.isFavorite = newFilm.isFavorite;
    }
    if (!(this.film.isWatched === newFilm.isWatched)) {
      this.film.isWatched = newFilm.isWatched;
    }
    if (!(this.film.inWatchlist === newFilm.inWatchlist)) {
      this.film.inWatchlist = newFilm.inWatchlist;
    }
  }

  getTemplate() {
    const {
      title, rating, date, duration,
      genres, description, poster, comments,
      isFavorite, isWatched, inWatchlist,
    } = this.film;
    const filmYear = date.getFullYear();
    const filmDuration = getFormatDuration(duration);
    const filmGenre = genres.join(`, `);
    const countComments = `${comments.length} comments`;
    const favoriteFilm = isFavorite ? CONTROLS_ACTIVE_BTN_CLASS : ``;
    const watchedFilm = isWatched ? CONTROLS_ACTIVE_BTN_CLASS : ``;
    const watchlistFilm = inWatchlist ? CONTROLS_ACTIVE_BTN_CLASS : ``;

    return (`<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${filmYear}</span>
            <span class="film-card__duration">${filmDuration}</span>
            <span class="film-card__genre">${filmGenre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${countComments}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistFilm}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedFilm}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteFilm}">Mark as favorite</button>
          </form>
        </article>`);
  }

  onShowPopup(cb) {
    addCbToClickOnElement(this, `img`, cb);
    addCbToClickOnElement(this, `.film-card__title`, cb);
    addCbToClickOnElement(this, `.film-card__comments`, cb);
    this._showPopupCallBack = cb;
  }

  onAddToWatchlist(cb) {
    addCbToClickOnElement(this, `.film-card__controls-item--add-to-watchlist`, cb);
    this._watchlistCallback = cb;
  }

  onMarkAsWatched(cb) {
    addCbToClickOnElement(this, `.film-card__controls-item--mark-as-watched`, cb);
    this._watchedCallBack = cb;
  }

  onMarkAsFavorite(cb) {
    addCbToClickOnElement(this, `.film-card__controls-item--favorite`, cb);
    this._favoriteCallBack = cb;
  }

  recoveryListeners() {
    this.onShowPopup(this._showPopupCallBack);
    this.onAddToWatchlist(this._watchlistCallback);
    this.onMarkAsWatched(this._watchedCallBack);
    this.onMarkAsFavorite(this._favoriteCallBack);
  }
}
