import FilmCard from "../components/film-card";
import FilmPopup from "../components/film-popup";
import {render} from "../utils/render";

const bodyElement = document.querySelector(`body`);
export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(film) {
    const filmCard = new FilmCard(film);
    const filmPopup = new FilmPopup(film);
    const renderFilmPopup = () => render(bodyElement, filmPopup);
    const deleteFilmPopup = () => filmPopup.getElement().remove();
    const createFilmPopup = () => {
      renderFilmPopup();
      filmPopup.onClosePopup(deleteFilmPopup);
    };

    filmCard.onAddToWatchlist((evt) => {
      const newFilm = Object.assign({}, film);
      newFilm.inWatchlist = !newFilm.inWatchlist;
      evt.preventDefault();
      this._onDataChange(this, film, newFilm);
    });
    filmCard.onMarkAsWatched((evt) => {
      const newFilm = Object.assign({}, film);
      newFilm.isWatched = !newFilm.isWatched;
      evt.preventDefault();
      this._onDataChange(this, film, newFilm);
    });
    filmCard.onMarkAsFavorite((evt) => {
      const newFilm = Object.assign({}, film);
      newFilm.isFavorite = !newFilm.isFavorite;
      evt.preventDefault();
      this._onDataChange(this, film, newFilm);
    });
    filmCard.onShowPopup(createFilmPopup);
    render(this._container, filmCard);
  }
}
