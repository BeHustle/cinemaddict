import {MAIN_FILMS_COUNT} from './constants';
import {render} from './utils/render';
import PageController from './controllers/page-controller';
import MoviesModel from './models/movies-model';
import Statistics from './components/statistics';
import UserProfile from './components/user-profile';
import FilterController from './controllers/filter-controller';
import Footer from './components/footer';
import {getRandomFilms} from './films-data';

const userProfile = new UserProfile();
const statistics = new Statistics();

const films = getRandomFilms(MAIN_FILMS_COUNT);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

const filterController = new FilterController(moviesModel, mainElement);
const pageController = new PageController(moviesModel, mainElement);
const footer = new Footer(films);

render(headerElement, userProfile);
filterController.render();

pageController.render();

render(mainElement, statistics);
render(bodyElement, footer);

