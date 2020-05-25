import {API_KEY, URL} from './constants';
import API from './api';
import PageController from './controllers/page-controller';
import MoviesModel from './models/movies-model';

const api = new API(URL, API_KEY);
const moviesModel = new MoviesModel();

const mainElement = document.querySelector(`.main`);

const pageController = new PageController(moviesModel, mainElement);

pageController.render();


api.getMovies().then((movies) =>{
  moviesModel.setMovies(movies);
}).catch(() => {
  moviesModel.setNoData();
});
