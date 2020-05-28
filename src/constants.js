const MAIN_FILMS_COUNT_ON_START = 5;
const MAIN_FILMS_COUNT_BY_BUTTON = 5;
const MOST_COMMENTED_FILMS_COUNT = 2;
const TOP_RATED_FILMS_COUNT = 2;
const FILMCARD_DESCRIPTION_LENGTH = 140;
const ESCAPE_KEY = `Escape`;
const ENTER_KEY = `Enter`;
const API_KEY = `Basic d4433f8f0503b4c98ee8cf75b42c5e88`;
const URL = `https://11.ecmascript.pages.academy/cinemaddict`;
const State = {
  LOADING: `loading`,
  DONE: `done`,
  NO_DATA: `no-data`,
};
const SortType = {
  BY_DEFAULT: `default`,
  BY_DATE: `date`,
  BY_RATING: `rating`,
};
const FilterType = {
  FAVORITE: `isFavorite`,
  WATCHED: `isWatched`,
  WATCHLIST: `inWatchlist`,
};
const UserRank = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie buff`,
};
const Selector = {
  BODY: `body`,
  HEADER: `.header`,
  MAIN: `.main`,
};

const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;


export {
  MOST_COMMENTED_FILMS_COUNT, TOP_RATED_FILMS_COUNT,
  MAIN_FILMS_COUNT_ON_START, MAIN_FILMS_COUNT_BY_BUTTON, ESCAPE_KEY,
  ENTER_KEY, API_KEY, URL, State, Selector,
  SortType, FILMCARD_DESCRIPTION_LENGTH, FilterType, STORE_NAME, UserRank,
};
