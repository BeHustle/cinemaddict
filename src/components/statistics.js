import AbstractComponent from './abstract-component';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getStatisticsFormatDuration} from '../utils/date-time';

const BAR_HEIGHT = 50;
const CHART_CONFIG = {
  type: `horizontalBar`,
  backgroundColor: `#ffe800`,
  hoverBackgroundColor: `#ffe800`,
  anchor: `start`,
  align: `start`,
  offset: 40,
  fontColor: `#ffffff`,
  fontSize: 20,
  padding: 100,
  gridLines: {
    display: false,
    drawBorder: false,
  },
  ticks: {
    display: false,
    beginAtZero: true,
  },
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  barThickness: 24
};

export default class Statistics extends AbstractComponent {
  constructor(data, filtersData, activeFilter) {
    super();
    this._data = data;
    this._filtersData = filtersData;
    this._activeFilter = activeFilter;
  }

  _getFilters() {
    let initialFilter = ``;
    this._filtersData.forEach((item, key) => {
      initialFilter += `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" ${key === this._activeFilter ? `checked` : ``} id="statistic-${key}" value="${key}">
      <label for="statistic-${key}" class="statistic__filters-label">${item.name}</label>`;
    });
    return initialFilter;
  }

  getTemplate() {
    const topGenre = this._data.genres.length ? this._data.genres[0].name : ``;
    const duration = getStatisticsFormatDuration(this._data.duration);
    const filters = this._getFilters();
    const rank = this._data.rank;
    return (`<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
     ${filters}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${this._data.countMovies} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${duration.h} <span class="statistic__item-description">h</span> ${duration.m ? duration.m : 0} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`);
  }

  renderChart() {
    const genres = new Map(this._data.genres.map((genre) => [genre.name, genre.value]));
    const chartElement = this.getElement().querySelector(`.statistic__chart`);
    chartElement.height = BAR_HEIGHT * genres.size;
    return new Chart(chartElement, {
      plugins: [ChartDataLabels],
      type: CHART_CONFIG.type,
      data: {
        labels: [...genres.keys()],
        datasets: [{
          data: [...genres.values()],
          backgroundColor: CHART_CONFIG.backgroundColor,
          hoverBackgroundColor: CHART_CONFIG.hoverBackgroundColor,
          anchor: CHART_CONFIG.anchor,
        }],
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: CHART_CONFIG.fontSize,
            },
            color: CHART_CONFIG.fontColor,
            anchor: CHART_CONFIG.anchor,
            align: CHART_CONFIG.align,
            offset: CHART_CONFIG.offset,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: CHART_CONFIG.fontColor,
              padding: CHART_CONFIG.padding,
              fontSize: CHART_CONFIG.fontSize,
            },
            gridLines: CHART_CONFIG.gridLines,
            barThickness: CHART_CONFIG.barThickness,
          }],
          xAxes: [{
            ticks: CHART_CONFIG.ticks,
            gridLines: CHART_CONFIG.gridLines,
          }],
        },
        legend: CHART_CONFIG.legend,
        tooltips: CHART_CONFIG.tooltips,
      },
    });
  }

  onFilterChange(cb) {
    this
      .getElement()
      .querySelectorAll(`.statistic__filters-input`)
      .forEach((filter) => {
        filter.addEventListener(`change`, ((evt) => {
          cb(evt.currentTarget.value);
        }));
      });
  }
}
