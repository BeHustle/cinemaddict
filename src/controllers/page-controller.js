import {render} from '../utils/render';
import {changeArrayElement} from '../utils/array';
import MostCommentedFilmsSection from '../components/most-commented-films-section';
import TopRatedFilmsSection from '../components/top-rated-films-section';
import MainFilmsSection from '../components/main-films-section';
import MoreButton from '../components/more-button';
import MovieController from './movie-controller';
import {
  MAIN_FILMS_COUNT_BY_BUTTON,
  MAIN_FILMS_COUNT_ON_START,
  MOST_COMMENTED_FILMS_COUNT,
  TOP_RATED_FILMS_COUNT,
} from '../constants';

let showingFilmsCount = MAIN_FILMS_COUNT_ON_START;
const moreButton = new MoreButton();
const mostCommentedFilmsSection = new MostCommentedFilmsSection();
const topRatedFilmsSection = new TopRatedFilmsSection();

export default class PageController {
  constructor(container) {
    this._container = container;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._movieControllers = [];
  }

  _renderFilms(films, container) {
    films.forEach((film) => {
      const movieController = new MovieController(container, this._onDataChange, this._onViewChange);
      movieController.render(film);
      this._movieControllers.push(movieController);
    });
  }

  _onViewChange() {
    this._movieControllers.forEach((controller) => controller.setDefaultView());
  }

  _onDataChange(controller, film, newFilm) {
    const index = this.films.findIndex((it) => it === film);

    if (index === -1) {
      return;
    }
    this.films = changeArrayElement(this.films, newFilm, index);
    controller.render(this.films[index]);
  }

  render(films) {
    if (films) {
      this.films = films;
      const mainFilmsSection = new MainFilmsSection();
      const topRatedFilms = this.films.slice(0, TOP_RATED_FILMS_COUNT);
      const mostCommentedFilms = this.films.slice(0, MOST_COMMENTED_FILMS_COUNT);
      const mainFilms = this.films.slice(0, showingFilmsCount);

      render(this._container, mainFilmsSection);
      render(mainFilmsSection.getFilmsList(), moreButton);
      render(mainFilmsSection.getElement(), mostCommentedFilmsSection);
      render(mainFilmsSection.getElement(), topRatedFilmsSection);

      this._renderFilms(mainFilms, mainFilmsSection.getFilmsListContainer());
      this._renderFilms(topRatedFilms, topRatedFilmsSection.getFilmsListContainer());
      this._renderFilms(mostCommentedFilms, mostCommentedFilmsSection.getFilmsListContainer());

      const showMoreFilms = (evt) => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += MAIN_FILMS_COUNT_BY_BUTTON;
        const currentFilms = this.films.slice(prevFilmsCount, showingFilmsCount);
        evt.preventDefault();
        this._renderFilms(currentFilms, mainFilmsSection.getFilmsListContainer());
        if (showingFilmsCount >= films.length) {
          moreButton.getElement().remove();
        }
      };

      moreButton.onClick(showMoreFilms);
    } else {
      const mainFilmsSection = new MainFilmsSection(`no-data`);
      render(this._container, mainFilmsSection);
    }
  }
}
