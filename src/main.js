import {MAIN_FILMS_COUNT, OTHER_FILMS_COUNT} from './constants';
import {render, renderList} from './util';
import {createStatistics} from './components/statistics';
import {createUserProfile} from './components/user';
import {createSort, createNavigation} from './components/menu';
import {createFilmsSection, createFilmPopup, createFilm, createMostCommentedFilms, createTopRatedFilms} from './components/films';
import {createShowMoreButton} from './components/buttons';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

render(headerElement, createUserProfile());
render(mainElement, createNavigation());
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

renderList(filmsContainerElement, createFilm(), MAIN_FILMS_COUNT);
renderList(topRatedSection, createFilm(), OTHER_FILMS_COUNT);
renderList(mostCommentedSection, createFilm(), OTHER_FILMS_COUNT);
render(mainElement, createStatistics());
//render(bodyElement, createFilmPopup());
