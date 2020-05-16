import {render, replace} from '../utils/render';
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

export default class PageController {
  constructor(moviesModel, commentsModel, container) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._moviesModel.onFilterChange(this.render.bind(this));
    this._onDataChange = this._onDataChange.bind(this);
    this._onCommentChange = this._onCommentChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._movieControllers = [];
  }

  _renderFilms(films, container) {
    films.forEach((film) => {
      const movieController = new MovieController(container, this._onDataChange, this._onViewChange, this._onCommentChange);
      movieController.render(film, this._commentsModel.getCommentsByFilmId(film.id));
      this._movieControllers.push(movieController);
    });
  }

  _onViewChange() {
    this._movieControllers.forEach((controller) => controller.setDefaultView());
  }

  _onDataChange(controller, film, newFilm) {
    this._moviesModel.setMovie(film.id, newFilm);
    controller.render(this._moviesModel.getMovie(newFilm.id), this._commentsModel.getCommentsByFilmId(newFilm.id));
  }

  _onCommentChange(controller, film, comment) {
    this._commentsModel.updateComment(film.id, comment);
    controller.render(this._moviesModel.getMovie(film.id), this._commentsModel.getCommentsByFilmId(film.id));
  }

  render() {
    const films = this._moviesModel.getMovies();
    if (films) {
      const oldFilmsSection = this._mainFilmsSection;
      this._mainFilmsSection = new MainFilmsSection();
      if (oldFilmsSection) {
        replace(this._mainFilmsSection, oldFilmsSection);
      } else {
        render(this._container, this._mainFilmsSection);
      }

      this._mostCommentedFilmsSection = new MostCommentedFilmsSection();
      this._topRatedFilmsSection = new TopRatedFilmsSection();
      this._moreButton = new MoreButton();
      const topRatedFilms = films.slice(0, TOP_RATED_FILMS_COUNT);
      const mostCommentedFilms = films.slice(0, MOST_COMMENTED_FILMS_COUNT);
      const mainFilms = films.slice(0, showingFilmsCount);

      if (films.length > showingFilmsCount) {
        render(this._mainFilmsSection.getFilmsList(), this._moreButton);
      }
      render(this._mainFilmsSection.getElement(), this._mostCommentedFilmsSection);
      render(this._mainFilmsSection.getElement(), this._topRatedFilmsSection);

      this._renderFilms(mainFilms, this._mainFilmsSection.getFilmsListContainer());
      this._renderFilms(topRatedFilms, this._topRatedFilmsSection.getFilmsListContainer());
      this._renderFilms(mostCommentedFilms, this._mostCommentedFilmsSection.getFilmsListContainer());

      const showMoreFilms = (evt) => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += MAIN_FILMS_COUNT_BY_BUTTON;
        const currentFilms = films.slice(prevFilmsCount, showingFilmsCount);
        evt.preventDefault();
        this._renderFilms(currentFilms, this._mainFilmsSection.getFilmsListContainer());
        if (showingFilmsCount >= films.length) {
          this._moreButton.getElement().remove();
        }
      };

      this._moreButton.onClick(showMoreFilms);
    } else {
      this._mainFilmsSection = new MainFilmsSection(`no-data`);
      render(this._container, this._mainFilmsSection);
    }
  }
}
