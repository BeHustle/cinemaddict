import {MAIN_FILMS_COUNT, TOP_RATED_FILMS_COUNT, MOST_COMMENTED_FILMS_COUNT,
  MAIN_FILMS_COUNT_ON_START, MAIN_FILMS_COUNT_BY_BUTTON} from './constants';
import Util from './Util';
import Statistics from './components/Statistics';
import UserProfile from './components/UserProfile';
import Sort from "./components/Sort";
import Filter from "./components/Filter";
import MostCommentedFilmsSection from "./components/MostCommentedFilmsSection";
import TopRatedFilmsSection from "./components/TopRatedFilmsSection";
import MainFilmsSection from "./components/MainFilmsSection";
import FilmPopup from "./components/FilmPopup";
import FilmCard from "./components/FilmCard";
import MoreButton from './components/MoreButton';
import FilmsData from "./FilmsData";

const films = new FilmsData();
const sort = new Sort();
const moreButton = new MoreButton();
const userProfile = new UserProfile();
const statistics = new Statistics();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);
const mainFilms = films.getRandomFilms(MAIN_FILMS_COUNT);
const filter = new Filter(mainFilms);
const topRatedFilms = films.getRandomFilms(TOP_RATED_FILMS_COUNT);
const mostCommentedFilms = films.getRandomFilms(MOST_COMMENTED_FILMS_COUNT);
let showingFilmsCount = MAIN_FILMS_COUNT_ON_START;

Util.render(headerElement, userProfile);
Util.render(mainElement, filter);
Util.render(mainElement, sort);
Util.render(mainElement, new MainFilmsSection());

const filmsSectionElement = document.querySelector(`.films`);
const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
const filmsContainerElement = filmsSectionElement.querySelector(`.films-list__container`);

Util.render(filmsListElement, moreButton);
Util.render(filmsSectionElement, new MostCommentedFilmsSection());
Util.render(filmsSectionElement, new TopRatedFilmsSection());

const topRatedSection = filmsSectionElement.querySelector(`#top-rated`);
const mostCommentedSection = filmsSectionElement.querySelector(`#most-commented`);
const showMoreButton = document.querySelector(`.films-list__show-more`);

mainFilms.slice(0, showingFilmsCount).forEach((film) => {
  const filmCard = new FilmCard(film);
  const filmPopup = new FilmPopup(film);
  const createFilmPopup = () => Util.render(bodyElement, filmPopup);

  filmCard.onCommentsClick(createFilmPopup);
  filmCard.onPosterClick(createFilmPopup);
  filmCard.onTitleClick(createFilmPopup);
  Util.render(filmsContainerElement, filmCard);
});
topRatedFilms.forEach((film) => Util.render(topRatedSection, new FilmCard(film)));
mostCommentedFilms.forEach((film) => Util.render(mostCommentedSection, new FilmCard(film)));
Util.render(mainElement, statistics);

showMoreButton.addEventListener(`click`, (evt) => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += MAIN_FILMS_COUNT_BY_BUTTON;
  evt.preventDefault();
  mainFilms.slice(prevFilmsCount, showingFilmsCount).forEach((film) => Util.render(filmsContainerElement, new FilmCard(film)));
  if (showingFilmsCount >= mainFilms.length) {
    showMoreButton.remove();
  }
});

