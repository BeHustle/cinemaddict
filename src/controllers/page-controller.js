import {render} from "../utils/render";
import MostCommentedFilmsSection from "../components/most-commented-films-section";
import TopRatedFilmsSection from "../components/top-rated-films-section";
import MainFilmsSection from "../components/main-films-section";
import MoreButton from "../components/more-button";
import MovieController from "./movie-controller";
import {
  MAIN_FILMS_COUNT_BY_BUTTON,
  MAIN_FILMS_COUNT_ON_START,
  MOST_COMMENTED_FILMS_COUNT,
  TOP_RATED_FILMS_COUNT,
} from "../constants";

let showingFilmsCount = MAIN_FILMS_COUNT_ON_START;
const moreButton = new MoreButton();
const mainFilmsSection = new MainFilmsSection();
const mostCommentedFilmsSection = new MostCommentedFilmsSection();
const topRatedFilmsSection = new TopRatedFilmsSection();

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  _renderFilms(films, container, from = 0, to = films.length) {
    const movieController = new MovieController(container, this._onDataChange);
    films.slice(from, to).forEach((film) => movieController.render(film));
  }

  _onDataChange(controller, film, newFilm) {
    console.log(controller, film, newFilm);
  }

  render(films) {
    this._topRatedFilms = films.slice(0, TOP_RATED_FILMS_COUNT);
    this._mostCommentedFilms = films.slice(0, MOST_COMMENTED_FILMS_COUNT);
    this._mainFilms = films;

    render(this._container, mainFilmsSection);
    render(mainFilmsSection.getFilmsList(), moreButton);
    render(mainFilmsSection.getElement(), mostCommentedFilmsSection);
    render(mainFilmsSection.getElement(), topRatedFilmsSection);

    this._renderFilms(this._mainFilms, mainFilmsSection.getFilmsListContainer(), 0, showingFilmsCount);
    this._renderFilms(this._topRatedFilms, topRatedFilmsSection.getFilmsListContainer());
    this._renderFilms(this._mostCommentedFilms, mostCommentedFilmsSection.getFilmsListContainer());

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
