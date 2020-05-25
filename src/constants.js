const MAIN_FILMS_COUNT_ON_START = 5;
const MAIN_FILMS_COUNT_BY_BUTTON = 5;
const MOST_COMMENTED_FILMS_COUNT = 2;
const TOP_RATED_FILMS_COUNT = 2;
const FILMCARD_DESCRIPTION_LENGTH = 140;
const ESCAPE_KEY = `Escape`;
const ENTER_KEY = `Enter`;
const API_KEY = `Basic ee5fsdfgggdf3`;
const URL = `https://11.ecmascript.pages.academy/cinemaddict`;
const LOADING_STATE = `loading`;
const DONE_STATE = `done`;
const NO_DATA_STATE = `no-data`;
const SORT = {
  BY_DEFAULT: `default`,
  BY_DATE: `date`,
  BY_RATING: `rating`
};
const FLAGS = {
  FAVORITE: `isFavorite`,
  WATCHED: `isWatched`,
  WATCHLIST: `inWatchlist`
};

export {MOST_COMMENTED_FILMS_COUNT, TOP_RATED_FILMS_COUNT,
  MAIN_FILMS_COUNT_ON_START, MAIN_FILMS_COUNT_BY_BUTTON, ESCAPE_KEY,
  ENTER_KEY, API_KEY, URL, DONE_STATE, LOADING_STATE, NO_DATA_STATE,
  SORT, FILMCARD_DESCRIPTION_LENGTH, FLAGS};
