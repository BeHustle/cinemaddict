import {render, replace} from '../utils/render';
import Statistics from '../components/statistics';
import moment from 'moment';

const PERIOD_FILTERS = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};
const addFilter = (name, date) => {
  return {name, date};
};
const FiltersData = new Map();
FiltersData.set(PERIOD_FILTERS.ALL, addFilter(`All time`, new Date(0)));
FiltersData.set(PERIOD_FILTERS.TODAY, addFilter(`Today`, moment().startOf(`day`).toDate()));
FiltersData.set(PERIOD_FILTERS.WEEK, addFilter(`Week`, moment().startOf(`week`).toDate()));
FiltersData.set(PERIOD_FILTERS.MONTH, addFilter(`Month`, moment().startOf(`month`).toDate()));
FiltersData.set(PERIOD_FILTERS.YEAR, addFilter(`Year`, moment().startOf(`year`).toDate()));

export default class StatisticsController {
  constructor(moviesModel, container) {
    this._moviesModel = moviesModel;
    this._container = container;
    this._moviesModel.onDataChange(this.render.bind(this));
    this.isHidden = true;
  }

  _getStatisticsData() {
    const movies = this._moviesModel.getWatchedMoviesFromDate(FiltersData.get(this._activeFilter).date);
    const genres = new Map();
    const statisticsData = {
      genres: [],
      countMovies: movies.length,
      duration: movies.length ? movies.reduce((acc, cv) => acc + cv.duration, 0) : 0,
      rank: this._moviesModel.getUserRank(),
    };
    for (const movie of movies) {
      if (movie.genres) {
        movie.genres.forEach((genre) => {
          genres.set(genre, genres.get(genre) !== undefined ? genres.get(genre) + 1 : 1);
        });
      }
    }
    for (const genre of genres) {
      statisticsData.genres.push({
        name: genre[0],
        value: genre[1],
      });
    }
    statisticsData.genres.sort((a, b) => b.value - a.value);
    return statisticsData;
  }

  _setDefaultFilter() {
    this._activeFilter = PERIOD_FILTERS.ALL;
  }

  render() {
    if (!this._activeFilter) {
      this._setDefaultFilter();
    }
    const oldStatistics = this._statistics;
    const statisticsData = this._getStatisticsData();
    this._statistics = new Statistics(statisticsData, FiltersData, this._activeFilter);
    if (oldStatistics) {
      replace(this._statistics, oldStatistics);
    } else {
      render(this._container, this._statistics);
      this._statistics.hide();
    }
    if (statisticsData.genres.length) {
      this._statistics.renderChart();
    }
    this._statistics.onFilterChange(this._updateStatisticsFilter.bind(this));
    if (this.isHidden) {
      this._statistics.hide();
    }
  }

  _updateStatisticsFilter(filter) {
    if (filter === this._activeFilter) {
      return;
    }
    this._activeFilter = filter;
    this.render();
  }

  setHidden() {
    this.isHidden = true;
    this._statistics.hide();
  }

  setShown() {
    this.isHidden = false;
    this._setDefaultFilter();
    this.render();
    this._statistics.show();
  }
}
