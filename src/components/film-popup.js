import {
  getCommentFormatDate,
  getReleaseDate,
  getFormatDuration,
} from '../utils/date-time';
import AbstractSmartComponent from './abstract-smart-component';
import {ENTER_KEY} from '../constants';
import {encode} from 'he';

export default class FilmPopup extends AbstractSmartComponent {
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;
    this._rerenderOnChangeEmoji();
  }

  _createFilmGenres(genres) {
    if (genres.length === 0) {
      return ``;
    }
    return genres.reduce((acc, cv) => {
      return `${acc} <span class="film-details__genre">${cv}</span>`;
    }, ``);
  }

  _createFilmControls(isWatched, inWatchlist, isFavorite) {
    const watchlist = inWatchlist ? `Already in watchlist` : `Add to watchlist`;
    const watched = isWatched ? `Already watched` : `Add to watched films`;
    const favorite = isFavorite ? `Already in favorites` : `Add to favorites`;
    return `<section class="film-details__controls">
        <input ${inWatchlist ? `checked` : ``} type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${watchlist}</label>

        <input ${isWatched ? `checked` : ``} type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">${watched}</label>

        <input ${isFavorite ? `checked` : ``} type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${favorite}</label>
   </section>`;
  }

  _createFilmComments() {
    return (`<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._getCountComments()}</span></h3>

        <ul class="film-details__comments-list">
            ${this._getComments()}
        </ul>

        <div class="film-details__new-comment">
          <label for="add-emoji" class="film-details__add-emoji-label"></label>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>`);
  }

  _getCountComments() {
    return this._comments ? this._comments.length : 0;
  }

  _getComments() {
    return this._comments ? this._comments.reduce((acc, cv) => {
      const {id, author, text, emoji, date} = cv;
      return acc + `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${getCommentFormatDate(date)}</span>
                <button class="film-details__comment-delete" data-comment="${id}">Delete</button>
              </p>
            </div>
          </li>`;
    }, ``) : ``;
  }

  updateComments(comments) {
    this._comments = comments;
    this
      .getElement()
      .querySelector(`.film-details__comments-count`)
      .innerText = this._getCountComments();
    this
      .getElement()
      .querySelector(`.film-details__comments-list`)
      .innerHTML = this._getComments();
    this._recoveryCommentDeleteListener();
  }

  getTemplate() {
    const {
      title, originalTitle, rating, director, writers, poster,
      actors, date, duration, countries, genres, description,
      ageRating, isFavorite, isWatched, inWatchlist,
    } = this._film;
    const filmWriters = writers.join(`, `);
    const filmActors = actors.join(`, `);
    const filmDuration = getFormatDuration(duration);
    const filmCountries = countries.join(`, `);
    const filmGenresTemplate = this._createFilmGenres(genres);
    const filmControlsSection = this._createFilmControls(isWatched, inWatchlist, isFavorite);
    const filmComments = this._createFilmComments();

    return (`<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="${title}">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmWriters}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmActors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${getReleaseDate(date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmDuration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmCountries}</td>
            </tr>
           ${filmGenresTemplate}
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>
      ${filmControlsSection}

    </div>

    <div class="form-details__bottom-container">
        ${filmComments}
    </div>
  </form>
</section>`);
  }

  onClosePopup(cb) {
    this.addCbToClickOnElement(`.film-details__close-btn`, cb);
  }

  onAddToWatchlist(cb) {
    this.addCbToClickOnElement(`#watchlist`, cb);
  }

  onMarkAsWatched(cb) {
    this.addCbToClickOnElement(`#watched`, cb);
  }

  onMarkAsFavorite(cb) {
    this.addCbToClickOnElement(`#favorite`, cb);
  }

  submitCommentForm(cb) {
    const form = this
      .getElement()
      .querySelector(`.film-details__inner`);
    const formData = new FormData(form);
    cb({emoji: formData.get(`comment-emoji`), text: encode(formData.get(`comment`))});
  }

  onCommentsFormSubmit(cb) {
    this
      .getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => {
        if (evt.ctrlKey && evt.key === ENTER_KEY) {
          this.submitCommentForm(cb);
        }
      });
  }

  onCommentDelete(cb) {
    this
      .getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((btn) => {
        btn.addEventListener(`click`, cb);
      });
    this._onCommentDeleteCalback = cb;
  }

  setCommentDeleting(evt) {
    evt.preventDefault();
    this._removeShake();
    evt.target.innerText = `Deleting...`;
    evt.target.setAttribute(`disabled`, `disabled`);
  }

  setErrorDuringDeleting(evt) {
    evt.target.innerText = `Delete`;
    evt.target.removeAttribute(`disabled`);
    this._shake();
  }

  _disableForm() {
    this
      .getElement()
      .querySelectorAll(`.film-details__emoji-item, form textarea`)
      .forEach((elem) => elem.setAttribute(`disabled`, `disabled`));
  }

  _enableForm() {
    this
      .getElement()
      .querySelectorAll(`.film-details__emoji-item, form textarea`)
      .forEach((elem) => elem.removeAttribute(`disabled`));
  }

  _clearForm() {
    this.getElement().querySelector(`form`).reset();
  }

  _shake() {
    this
      .getElement()
      .querySelector(`form`)
      .classList
      .add(`shake`);
    window.setTimeout(this._removeShake.bind(this), 500);
  }

  _setErrorStyle() {
    this
      .getElement()
      .querySelector(`.film-details__comment-input`)
      .classList
      .add(`film-details__comment-input--error`);
  }

  _removeErrorStyle() {
    this
      .getElement()
      .querySelector(`.film-details__comment-input`)
      .classList
      .remove(`film-details__comment-input--error`);
  }

  setCommentAdding() {
    this._disableForm();
    this._removeShake();
    this._removeErrorStyle();
  }

  onSuccessCommentAdd() {
    this._clearForm();
    this._enableForm();
    this
      .getElement()
      .querySelector(`.film-details__add-emoji-label`)
      .innerHTML = ``;
  }

  onErrorCommentAdd() {
    this._enableForm();
    this._shake();
    this._setErrorStyle();
  }

  _removeShake() {
    this
      .getElement()
      .querySelector(`form`)
      .classList
      .remove(`shake`);
  }

  _recoveryCommentDeleteListener() {
    this.onCommentDelete(this._onCommentDeleteCalback);
  }

  _onEmojiChange(evt) {
    const emojiImg = this
      .getElement()
      .querySelector(`label[for="${evt.currentTarget.id}"]`)
      .querySelector(`img`)
      .src;
    this
      .getElement()
      .querySelector(`.film-details__add-emoji-label`)
      .innerHTML = `<img src="${emojiImg}" width="60" height="60">`;
  }

  _rerenderOnChangeEmoji() {
    this
      .getElement()
      .querySelectorAll(`.film-details__emoji-item`)
      .forEach((item) => {
        item.addEventListener(`change`, this._onEmojiChange.bind(this));
      });
  }

  disableComments() {
    this
      .getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((btn) => {
        btn.classList.add(`d-none`);
        btn.setAttribute(`disabled`, `disabled`);
      });
    this._disableForm();
  }

  enableComments() {
    this
      .getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((btn) => {
        btn.classList.remove(`d-none`);
        btn.removeAttribute(`disabled`);
      });
    this._enableForm();
  }
}
