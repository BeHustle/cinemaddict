import {MAIN_FILMS_COUNT} from './constants';
import {render} from './utils/render';
import PageController from './controllers/page-controller';
import Statistics from './components/statistics';
import UserProfile from './components/user-profile';
import Sort from './components/sort';
import Filter from './components/filter';
import Footer from './components/footer';
import {getRandomFilms} from './films-data';

const sort = new Sort();
const userProfile = new UserProfile();
const statistics = new Statistics();

const films = getRandomFilms(MAIN_FILMS_COUNT);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const filter = new Filter(films);
const pageController = new PageController(mainElement);
const footer = new Footer(films);

render(headerElement, userProfile);
render(mainElement, filter);
render(mainElement, sort);

pageController.render(films);

render(mainElement, statistics);
render(bodyElement, footer);
