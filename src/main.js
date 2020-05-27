import {API_KEY, URL, STORE_NAME} from './constants';
import API from './api';
import Provider from './api/provider';
import Store from './api/store';
import PageController from './controllers/page-controller';
import MoviesModel from './models/movies-model';

const api = new API(URL, API_KEY);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const moviesModel = new MoviesModel();

const mainElement = document.querySelector(`.main`);

const pageController = new PageController(moviesModel, mainElement);

pageController.render();

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {})
    .catch(() => {});
});

apiWithProvider.getMovies().then((movies) => {
  moviesModel.setMovies(movies);
}).catch(() => {
  moviesModel.setNoData();
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  pageController.enableComments();
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  pageController.disableComments();
  document.title += ` [offline]`;
});
