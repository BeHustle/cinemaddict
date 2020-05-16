import {MAIN_FILMS_COUNT} from './constants';
import {render} from './utils/render';
import PageController from './controllers/page-controller';
import MoviesModel from './models/movies-model';
import CommentsModel from './models/comments-model';
import Statistics from './components/statistics';
import UserProfile from './components/user-profile';
import Sort from './components/sort';
import FilterController from './controllers/filter-controller';
import Footer from './components/footer';
import {getRandomComments, getRandomFilms} from './films-data';

const sort = new Sort();
const userProfile = new UserProfile();
const statistics = new Statistics();

const films = getRandomFilms(MAIN_FILMS_COUNT);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();
moviesModel.setMovies(films);
films.forEach((item) => commentsModel.setComments(item.id, getRandomComments()));

const filterController = new FilterController(moviesModel, mainElement);
const pageController = new PageController(moviesModel, commentsModel, mainElement);
const footer = new Footer(films);

render(headerElement, userProfile);
filterController.render();
render(mainElement, sort);

pageController.render();

render(mainElement, statistics);
render(bodyElement, footer);
