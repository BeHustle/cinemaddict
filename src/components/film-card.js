import {getFormatDuration} from '../utils/date-time';
import {descriptionSlice} from '../utils/render';
import AbstractSmartComponent from './abstract-smart-component';

const CONTROLS_ACTIVE_BTN_CLASS = `film-card__controls-item--active`;

export default class FilmCard extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._countComments = `${this._film.comments.length} comments`;
  }

  getTemplate() {
    const {
      title, rating, date, duration,
      genres, description, poster,
      isFavorite, isWatched, inWatchlist,
    } = this._film;
    const filmYear = date.getFullYear();
    const filmDuration = getFormatDuration(duration);
    const filmGenre = genres.join(`, `);
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
          <img src="${poster}" alt="${title}" class="film-card__poster">
          <p class="film-card__description">${descriptionSlice(description)}</p>
          <a class="film-card__comments">${this._countComments}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistFilm}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedFilm}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteFilm}">Mark as favorite</button>
          </form>
        </article>`);
  }

  updateCountComments(countComments) {
    this._countComments = countComments;
    this
      .getElement()
      .querySelector(`.film-card__comments`)
      .innerText = `${this._countComments} comments`;
  }

  onShowPopup(cb) {
    this.addCbToClickOnElement(`img`, cb);
    this.addCbToClickOnElement(`.film-card__title`, cb);
    this.addCbToClickOnElement(`.film-card__comments`, cb);
  }

  onAddToWatchlist(cb) {
    this.addCbToClickOnElement(`.film-card__controls-item--add-to-watchlist`, cb);
  }

  onMarkAsWatched(cb) {
    this.addCbToClickOnElement(`.film-card__controls-item--mark-as-watched`, cb);
  }

  onMarkAsFavorite(cb) {
    this.addCbToClickOnElement(`.film-card__controls-item--favorite`, cb);
  }
}
