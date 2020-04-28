import {MAIN_FILMS_COUNT, TOP_RATED_FILMS_COUNT, MOST_COMMENTED_FILMS_COUNT,
  MAIN_FILMS_COUNT_ON_START, MAIN_FILMS_COUNT_BY_BUTTON} from './constants';
import Util from './Util';
import Statistics from './components/Statistics';
import UserProfile from './components/UserProfile';
import Sort from "./components/Sort";
import Filter from "./components/Filter";
import {createFilmsSection, createFilmPopup, createFilm, createMostCommentedFilms, createTopRatedFilms} from './components/films';
import MoreButton from './components/MoreButton';
import FilmsData from "./FilmsData";

const films = new FilmsData();
const SortTemplate = new Sort().getTemplate();
const moreButtonTemplate = new MoreButton().getTemplate();
const userProfileTemplate = new UserProfile().getTemplate();
const statisticsTemplate = new Statistics().getTemplate();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);
const mainFilms = Util.generateObjectsArray(films.getRandomFilm, MAIN_FILMS_COUNT);
const filterTemplate = new Filter(mainFilms).getTemplate();
const topRatedFilms = Util.generateObjectsArray(films.getRandomFilm, TOP_RATED_FILMS_COUNT);
const mostCommentedFilms = Util.generateObjectsArray(films.getRandomFilm, MOST_COMMENTED_FILMS_COUNT);
let showingFilmsCount = MAIN_FILMS_COUNT_ON_START;

Util.render(headerElement, userProfileTemplate);
Util.render(mainElement, filterTemplate);
Util.render(mainElement, SortTemplate);
Util.render(mainElement, createFilmsSection());

const filmsSectionElement = document.querySelector(`.films`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
const filmsContainerElement = filmsSectionElement.querySelector(`.films-list__container`);

Util.render(filmsListElement, moreButtonTemplate);
Util.render(filmsSectionElement, createTopRatedFilms());
Util.render(filmsSectionElement, createMostCommentedFilms());

const topRatedSection = filmsSectionElement.querySelector(`#top-rated`);
const mostCommentedSection = filmsSectionElement.querySelector(`#most-commented`);
const showMoreButton = document.querySelector(`.films-list__show-more`);

mainFilms.slice(0, showingFilmsCount).forEach((film) => Util.render(filmsContainerElement, createFilm(film)));
topRatedFilms.forEach((film) => Util.render(topRatedSection, createFilm(film)));
mostCommentedFilms.forEach((film) => Util.render(mostCommentedSection, createFilm(film)));
Util.render(mainElement, statisticsTemplate);
Util.render(bodyElement, createFilmPopup(films.getRandomFilm()));

showMoreButton.addEventListener(`click`, (evt) => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += MAIN_FILMS_COUNT_BY_BUTTON;
  evt.preventDefault();
  mainFilms.slice(prevFilmsCount, showingFilmsCount).forEach((film) => Util.render(filmsContainerElement, createFilm(film)));
  if (showingFilmsCount >= mainFilms.length) {
    showMoreButton.remove();
  }
});
