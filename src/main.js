import {API_KEY, URL} from './constants';
import {render} from './utils/render';
import API from './api';
import PageController from './controllers/page-controller';
import MoviesModel from './models/movies-model';
import Statistics from './components/statistics';
import UserProfile from './components/user-profile';
import Sort from './components/sort';
import FilterController from './controllers/filter-controller';
import FooterController from './controllers/footer-controller';


const api = new API(URL, API_KEY);
const moviesModel = new MoviesModel();
const sort = new Sort();
const userProfile = new UserProfile();
const statistics = new Statistics();


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

render(headerElement, userProfile);
render(mainElement, sort);

const filterController = new FilterController(moviesModel, mainElement);
const pageController = new PageController(moviesModel, mainElement);
const footerController = new FooterController(moviesModel, bodyElement);

filterController.render();
pageController.render();
footerController.render();

render(mainElement, statistics);

api.getMovies().then((movies) =>{
  moviesModel.setMovies(movies);
});


