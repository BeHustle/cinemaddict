import {MAIN_FILMS_COUNT, TOP_RATED_FILMS_COUNT, MOST_COMMENTED_FILMS_COUNT,
  MAIN_FILMS_COUNT_ON_START, MAIN_FILMS_COUNT_BY_BUTTON} from './constants';
import {render} from "./utils/render";
import Statistics from "./components/statistics";
import UserProfile from "./components/user-profile";
import Sort from "./components/sort";
import Filter from "./components/filter";
import MostCommentedFilmsSection from "./components/most-commented-films-section";
import TopRatedFilmsSection from "./components/top-rated-films-section";
import MainFilmsSection from "./components/main-films-section";
import FilmPopup from "./components/film-popup";
import FilmCard from "./components/film-card";
import MoreButton from "./components/more-button";
import {getRandomFilms} from "./films-data";

const sort = new Sort();
const moreButton = new MoreButton();
const userProfile = new UserProfile();
const statistics = new Statistics();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);
const mainFilms = getRandomFilms(MAIN_FILMS_COUNT);
const filter = new Filter(mainFilms);
const topRatedFilms = getRandomFilms(TOP_RATED_FILMS_COUNT);
const mostCommentedFilms = getRandomFilms(MOST_COMMENTED_FILMS_COUNT);
let showingFilmsCount = MAIN_FILMS_COUNT_ON_START;

render(headerElement, userProfile);
render(mainElement, filter);
render(mainElement, sort);
render(mainElement, new MainFilmsSection());

const filmsSectionElement = document.querySelector(`.films`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
const filmsContainerElement = filmsSectionElement.querySelector(`.films-list__container`);

render(filmsListElement, moreButton);
render(filmsSectionElement, new MostCommentedFilmsSection());
render(filmsSectionElement, new TopRatedFilmsSection());

const topRatedSection = filmsSectionElement.querySelector(`#top-rated`);
const mostCommentedSection = filmsSectionElement.querySelector(`#most-commented`);
const showMoreButton = document.querySelector(`.films-list__show-more`);

const createFilm = (film, container) => {
  const filmCard = new FilmCard(film);
  const filmPopup = new FilmPopup(film);
  const renderFilmPopup = () => render(bodyElement, filmPopup);
  const deleteFilmPopup = () => {
    filmPopup.removeCloseBtnListener(deleteFilmPopup);
    filmPopup.getElement().remove();
  };
  const createFilmPopup = () => {
    renderFilmPopup();
    filmPopup.onClosePopup(deleteFilmPopup);
  };

  filmCard.onShowPopup(createFilmPopup);
  render(container, filmCard);
};

mainFilms.slice(0, showingFilmsCount).forEach((film) => createFilm(film, filmsContainerElement));
topRatedFilms.forEach((film) => createFilm(film, topRatedSection));
mostCommentedFilms.forEach((film) => createFilm(film, mostCommentedSection));

render(mainElement, statistics);

showMoreButton.addEventListener(`click`, (evt) => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += MAIN_FILMS_COUNT_BY_BUTTON;
  evt.preventDefault();
  mainFilms.slice(prevFilmsCount, showingFilmsCount).forEach((film) => createFilm(film, filmsContainerElement));
  if (showingFilmsCount >= mainFilms.length) {
    showMoreButton.remove();
  }
});
