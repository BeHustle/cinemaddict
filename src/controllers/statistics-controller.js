import {render, replace} from '../utils/render';
import Statistics from '../components/statistics';
import moment from 'moment';

export default class StatisticsController {
  constructor(moviesModel, container) {
    this._moviesModel = moviesModel;
    this._container = container;
    this._moviesModel.onDataChange(this.render.bind(this));
    this._statisticsDate = new Date(0);
    this._activeFilter = `all-time`;
    this.isHidden = true;
  }

  _getStatisticsData() {
    const movies = this._moviesModel.getWatchedMoviesFromDate(this._statisticsDate);
    const genres = new Map();
    const statisticsData = {
      genres: [],
      countMovies: movies.length,
      duration: movies.length ? movies.reduce((acc, cv) => acc + cv.duration, 0) : 0,
      rank: this._moviesModel.getUserRank()
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

  _getFiltersData() {
    const addFilter = (name, value) => {
      return {name, value};
    };
    const filtersData = [];
    filtersData.push(addFilter(`All time`, `all-time`));
    filtersData.push(addFilter(`Today`, `today`));
    filtersData.push(addFilter(`Week`, `week`));
    filtersData.push(addFilter(`Month`, `month`));
    filtersData.push(addFilter(`Year`, `year`));
    return filtersData;
  }

  render() {
    const oldStatistics = this._statistics;
    const statisticsData = this._getStatisticsData();
    this._statistics = new Statistics(statisticsData, this._getFiltersData(), this._activeFilter);
    if (oldStatistics) {
      replace(this._statistics, oldStatistics);
    } else {
      render(this._container, this._statistics);
      this._statistics.hide();
    }
    if (statisticsData.genres.length) {
      this._statistics.renderChart();
    }
    this._statistics.onFilterChange(this._updateStatisticsDate.bind(this));
    if (this.isHidden) {
      this._statistics.hide();
    }
  }

  _updateStatisticsDate(dateName) {
    if (dateName === this._activeFilter) {
      return;
    }
    switch (dateName) {
      case `all-time`:
        this._statisticsDate = new Date(0);
        this._activeFilter = `all-time`;
        break;
      case `today`:
        this._statisticsDate = moment().startOf(`day`).toDate();
        this._activeFilter = `today`;
        break;
      case `week`:
        this._statisticsDate = moment().startOf(`week`).toDate();
        this._activeFilter = `week`;
        break;
      case `month`:
        this._statisticsDate = moment().startOf(`month`).toDate();
        this._activeFilter = `month`;
        break;
      case `year`:
        this._statisticsDate = moment().startOf(`year`).toDate();
        this._activeFilter = `year`;
        break;
    }
    this.render();
  }

  setHidden() {
    this.isHidden = true;
    this._statistics.hide();
  }

  setShown() {
    this.isHidden = false;
    this._statisticsDate = new Date(0);
    this._activeFilter = `all-time`;
    this.render();
    this._statistics.show();
  }
}
