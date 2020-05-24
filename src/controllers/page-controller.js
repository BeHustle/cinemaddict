import {render, replace} from '../utils/render';
import API from '../api';
import MostCommentedFilmsSection from '../components/most-commented-films-section';
import TopRatedFilmsSection from '../components/top-rated-films-section';
import MainFilmsSection from '../components/main-films-section';
import MainMenu from '../components/main-menu';
import UserProfile from '../components/user-profile';
import MoreButton from '../components/more-button';
import MovieController from './movie-controller';
import FooterController from './footer-controller';
import FilterController from './filter-controller';
import Sort from '../components/sort';
import {
  MAIN_FILMS_COUNT_BY_BUTTON,
  MAIN_FILMS_COUNT_ON_START,
  LOADING_STATE,
  NO_DATA_STATE,
  URL,
  API_KEY,
} from '../constants';
import StatisticsController from './statistics-controller';

const bodyElement = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);

export default class PageController {
  constructor(moviesModel, container) {
    this._api = new API(URL, API_KEY);
    this._container = container;
    this._moviesModel = moviesModel;
    this._moviesModel.onDataChange(this._renderMainContent.bind(this));
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onCommentsUpdate = this._onCommentsUpdate.bind(this);
    this._movieControllers = [];
  }

  _renderStatistics() {
    this._statisticsController = new StatisticsController(this._moviesModel, this._container);
    this._statisticsController.render();
    this._statisticsShowed = false;
  }

  _renderUserProfile() {
    this._userProfile = new UserProfile();
    render(headerElement, this._userProfile);
  }

  _renderMenu() {
    this._mainMenu = new MainMenu();
    render(this._container, this._mainMenu);
    this._mainMenu.onStatisticsClick(this._toggleStatistics.bind(this));
  }

  _renderFilter() {
    this._filterController = new FilterController(this._moviesModel, this._mainMenu.getElement());
    this._filterController.render();
  }

  _renderFooter() {
    this._footerController = new FooterController(this._moviesModel, bodyElement);
    this._footerController.render();
  }

  _renderFilms(films, container) {
    films.forEach((film) => {
      const movieController = new MovieController(container, this._onDataChange, this._onViewChange, this._onCommentsUpdate);
      movieController.render(film);
      this._movieControllers.push(movieController);
    });
  }

  _onViewChange() {
    this._movieControllers.forEach((controller) => controller.setDefaultView());
  }

  _onDataChange(controller, film, newFilm) {
    this._api.updateMovie(film.id, newFilm)
      .then((movie) => {
        this._moviesModel.setMovie(film.id, movie);
        controller.render(this._moviesModel.getMovie(newFilm.id));
      });
  }

  renderMostCommentedSection() {
    this._mostCommentedSection = new MostCommentedFilmsSection();
    render(this._mainFilmsSection.getElement(), this._mostCommentedSection);
    this._mostCommentedSection.clear();
  }

  _onCommentsUpdate() {
    const mostCommentedFilms = this._moviesModel.getMostCommentedMovies();
    this._mostCommentedSection.clear();
    if (mostCommentedFilms) {
      const oldMostCommentedSection = this._mostCommentedSection;
      this._mostCommentedSection = new MostCommentedFilmsSection();
      replace(this._mostCommentedSection, oldMostCommentedSection);
      this._renderFilms(mostCommentedFilms, this._mostCommentedSection.getFilmsListContainer());
    }
  }

  renderTopRatedFilms() {
    const topRatedFilms = this._moviesModel.getTopRatedMovies();
    if (!topRatedFilms) {
      return;
    }
    this._topRatedSection = new TopRatedFilmsSection();
    render(this._mainFilmsSection.getElement(), this._topRatedSection);
    this._renderFilms(topRatedFilms, this._topRatedSection.getFilmsListContainer());
  }

  render() {
  _renderMainContent() {
    const oldSortComponent = this._sortComponent;
    const oldMainFilmsSection = this._mainFilmsSection;
    this._sortComponent = new Sort(this._moviesModel.getActiveSort());

    if (oldSortComponent) {
      replace(this._sortComponent, oldSortComponent);
    } else {
      render(this._container, this._sortComponent);
    }

    if (this._moviesModel.getState() === LOADING_STATE) {
      this._mainFilmsSection = new MainFilmsSection(LOADING_STATE);
      if (oldMainFilmsSection) {
        replace(this._mainFilmsSection, oldMainFilmsSection);
      } else {
        render(this._container, this._mainFilmsSection);
      }
      return;
    }
    if (this._moviesModel.getCountMovies() === 0 || this._moviesModel.getState() === NO_DATA_STATE) {
      this._mainFilmsSection = new MainFilmsSection(NO_DATA_STATE);
      if (oldMainFilmsSection) {
        replace(this._mainFilmsSection, oldMainFilmsSection);
      } else {
        render(this._container, this._mainFilmsSection);
      }
      return;
    }

    const films = this._moviesModel.getMovies();
    const oldFilmsSection = this._mainFilmsSection;
    this._mainFilmsSection = new MainFilmsSection();
    if (oldFilmsSection) {
      replace(this._mainFilmsSection, oldFilmsSection);
    } else {
      render(this._container, this._mainFilmsSection);
    }

    let showingFilmsCount = MAIN_FILMS_COUNT_ON_START;
    this._sortComponent.onSortChange(this._moviesModel.updateSort.bind(this._moviesModel));
    this._moreButton = new MoreButton();
    const mainFilms = films.slice(0, showingFilmsCount);
    this._moreButton = new MoreButton();

    if (films.length > showingFilmsCount) {
      render(this._mainFilmsSection.getFilmsList(), this._moreButton);
    }

    this._renderFilms(mainFilms, this._mainFilmsSection.getFilmsListContainer());

    this.renderTopRatedFilms();
    this.renderMostCommentedSection();
    this._onCommentsUpdate();

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
  }

  _onViewChange() {
    this._movieControllers.forEach((controller) => controller.setDefaultView());
  }

  _onDataChange(controller, film, newFilm) {
    this._api.updateMovie(film.id, newFilm)
      .then((movie) => {
        this._moviesModel.setMovie(film.id, movie);
        controller.render(this._moviesModel.getMovie(newFilm.id));
      });
  }

  _toggleStatistics(evt) {
    evt.preventDefault();
    if (this._statisticsShowed) {
      this._renderMainContent();
      this._mainFilmsSection.show();
      this._sortComponent.show();
      this._filterController.showFilters();
      this._statisticsController.setHidden();
      this._statisticsShowed = false;
    } else {
      this._mainFilmsSection.hide();
      this._sortComponent.hide();
      this._filterController.hideFilters();
      this._statisticsController.setShown();
      this._statisticsShowed = true;
    }
  }

  render() {
    this._renderUserProfile();
    this._renderMenu();
    this._renderFilter();

    this._renderMainContent();

    this._renderStatistics();
    this._renderFooter();
  }
}
