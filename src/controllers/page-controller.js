import {render} from "../utils/render";
import MostCommentedFilmsSection from "../components/most-commented-films-section";
import TopRatedFilmsSection from "../components/top-rated-films-section";
import MainFilmsSection from "../components/main-films-section";
import FilmPopup from "../components/film-popup";
import FilmCard from "../components/film-card";
import MoreButton from "../components/more-button";
import {
  MAIN_FILMS_COUNT_BY_BUTTON,
  MAIN_FILMS_COUNT_ON_START,
  MOST_COMMENTED_FILMS_COUNT,
  TOP_RATED_FILMS_COUNT,
} from "../constants";

const bodyElement = document.querySelector(`body`);
let showingFilmsCount = MAIN_FILMS_COUNT_ON_START;
const moreButton = new MoreButton();
const mainFilmsSection = new MainFilmsSection();
const mostCommentedFilmsSection = new MostCommentedFilmsSection();
const topRatedFilmsSection = new TopRatedFilmsSection();

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  _createFilm(film, container) {
    const filmCard = new FilmCard(film);
    const filmPopup = new FilmPopup(film);
    const renderFilmPopup = () => render(bodyElement, filmPopup);
    const deleteFilmPopup = () => filmPopup.getElement().remove();
    const createFilmPopup = () => {
      renderFilmPopup();
      filmPopup.onClosePopup(deleteFilmPopup);
    };

    filmCard.onShowPopup(createFilmPopup);
    render(container, filmCard);
  }

  _renderFilms(films, container, from = 0, to = films.length) {
    films.slice(from, to).forEach((film) => this._createFilm(film, container));
  }

  render(films) {
    const topRatedFilms = films.slice(0, TOP_RATED_FILMS_COUNT);
    const mostCommentedFilms = films.slice(0, MOST_COMMENTED_FILMS_COUNT);

    render(this._container, mainFilmsSection);
    render(mainFilmsSection.getFilmsList(), moreButton);
    render(mainFilmsSection.getElement(), mostCommentedFilmsSection);
    render(mainFilmsSection.getElement(), topRatedFilmsSection);

    this._renderFilms(films, mainFilmsSection.getFilmsListContainer(), 0, showingFilmsCount);
    this._renderFilms(topRatedFilms, topRatedFilmsSection.getFilmsListContainer());
    this._renderFilms(mostCommentedFilms, mostCommentedFilmsSection.getFilmsListContainer());

    const showMoreFilms = (evt) => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount += MAIN_FILMS_COUNT_BY_BUTTON;
      evt.preventDefault();
      this._renderFilms(films, mainFilmsSection.getFilmsListContainer(), prevFilmsCount, showingFilmsCount);
      if (showingFilmsCount >= films.length) {
        moreButton.getElement().remove();
      }
    };

    moreButton.onClick(showMoreFilms);
  }
}
