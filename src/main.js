import {MAIN_FILMS_COUNT, TOP_RATED_FILMS_COUNT, MOST_COMMENTED_FILMS_COUNT,
  MAIN_FILMS_COUNT_ON_START, MAIN_FILMS_COUNT_BY_BUTTON} from './constants';
import {render, generateObjectsArray} from './util';
import {createStatistics} from './components/statistics';
import {createUserProfile} from './components/user';
import {createSort, createFilter} from './components/menu';
import {createFilmsSection, createFilmPopup, createFilm, createMostCommentedFilms, createTopRatedFilms} from './components/films';
import {createShowMoreButton} from './components/buttons';
import {getRandomFilm} from "./data";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);
const mainFilms = generateObjectsArray(getRandomFilm, MAIN_FILMS_COUNT);
const topRatedFilms = generateObjectsArray(getRandomFilm, TOP_RATED_FILMS_COUNT);
const mostCommentedFilms = generateObjectsArray(getRandomFilm, MOST_COMMENTED_FILMS_COUNT);
let showingFilmsCount = MAIN_FILMS_COUNT_ON_START;

render(headerElement, createUserProfile());
render(mainElement, createFilter(mainFilms));
render(mainElement, createSort());
render(mainElement, createFilmsSection());

const filmsSectionElement = document.querySelector(`.films`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
const filmsContainerElement = filmsSectionElement.querySelector(`.films-list__container`);

render(filmsListElement, createShowMoreButton());
render(filmsSectionElement, createTopRatedFilms());
render(filmsSectionElement, createMostCommentedFilms());

const topRatedSection = filmsSectionElement.querySelector(`#top-rated`);
const mostCommentedSection = filmsSectionElement.querySelector(`#most-commented`);
const showMoreButton = document.querySelector(`.films-list__show-more`);

mainFilms.slice(0, showingFilmsCount).forEach((film) => render(filmsContainerElement, createFilm(film)));
topRatedFilms.forEach((film) => render(topRatedSection, createFilm(film)));
mostCommentedFilms.forEach((film) => render(mostCommentedSection, createFilm(film)));
render(mainElement, createStatistics());
render(bodyElement, createFilmPopup(getRandomFilm()));

showMoreButton.addEventListener(`click`, (evt) => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += MAIN_FILMS_COUNT_BY_BUTTON;
  evt.preventDefault();
  mainFilms.slice(prevFilmsCount, showingFilmsCount).forEach((film) => render(filmsContainerElement, createFilm(film)));
  if (showingFilmsCount >= mainFilms.length) {
    showMoreButton.remove();
  }
});
