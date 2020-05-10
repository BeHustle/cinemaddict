import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import {render} from "../utils/render";

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

  _setFlagHandlers(component) {
    component.onAddToWatchlist((evt) => {
      this._changeFlag(component.film, `inWatchlist`);
      evt.preventDefault();
    });
    component.onMarkAsWatched((evt) => {
      this._changeFlag(component.film, `isWatched`);
      evt.preventDefault();
    });
    component.onMarkAsFavorite((evt) => {
      this._changeFlag(component.film, `isFavorite`);
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
      this._onViewChange(this);
      this.renderFilmPopup();
      this._filmPopup.onClosePopup(this.deleteFilmPopup.bind(this));
      this._setFlagHandlers(this._filmPopup);
    };

    if (!this._filmCard && !this._filmPopup) {
      this._filmCard = new FilmCard(film);
      this._filmPopup = new FilmPopup(this._filmCard.film);
      this._setFlagHandlers(this._filmCard);
      this._filmCard.onShowPopup(createFilmPopup);
      render(this._container, this._filmCard);
    } else if (!(JSON.stringify(this._filmCard.film) === JSON.stringify(film))) {
      this._filmCard.film = film;
      this._filmPopup.film = this._filmCard.film;
      this._setFlagHandlers(this._filmCard);
      this._setFlagHandlers(this._filmPopup);
      this._filmCard.rerender();
      this._filmPopup.rerender();
      this._filmCard.onShowPopup(createFilmPopup);
    }
  }
}
