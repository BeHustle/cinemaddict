import {render, replace} from '../utils/render';
import Statistics from '../components/statistics';

export default class StatisticsController {
  constructor(moviesModel, container) {
    this._moviesModel = moviesModel;
    this._container = container;
    this._moviesModel.onDataChange(this.render.bind(this));
    this._statisticsDate = new Date(0);
  }

  _getStatisticsData() {
    const date = this._statisticsDate;
    const movies = this._moviesModel.getWatchedMoviesFromDate(date);
    const genres = new Map();
    const statisticsData = {
      genres: [],
      countMovies: movies.length,
      duration: movies.length ? movies.reduce((acc, cv) => acc + cv.duration, 0) : 0,
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
        value: genre[1]
      });
    }
    statisticsData.genres.sort((a, b) => b.value - a.value);
    return statisticsData;
  }

  render() {
    const oldStatistics = this._statistics;
    this._statistics = new Statistics(this._getStatisticsData());
    if (oldStatistics) {
      replace(this._statistics, oldStatistics);
    } else {
      render(this._container, this._statistics);
      this._statistics.hide();
    }
    this._statistics.renderChart();
  }

  _updateStatisticsDate(dateName) {
    switch (dateName) {
      case `all-time`:
        this._statisticsDate = new Date(0);
        break;
      case `today`:
        this._statisticsDate = new Date()
    }
  }

  showStatistics() {
    this._statistics.show();
  }

  hideStatistics() {
    this._statistics.hide();
  }
}
