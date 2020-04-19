const getFiltersData = function (films) {
  const Filter = function (title, count) {
    this.title = title;
    this.count = count;
  };
  const filterData = [
    new Filter(`Watchlist`, 0),
    new Filter(`History`, 0),
    new Filter(`Favorites`, 0),
  ];
  const incrementFilterValue = (boolean, key) => {
    if (boolean) {
      for (const filter of filterData) {
        if (filter.title === key) {
          filter.count++;
          break;
        }
      }
    }
  };
  films.forEach((film) => {
    const {inWatchlist, isWatched, isFavorite} = film;
    incrementFilterValue(inWatchlist, `Watchlist`);
    incrementFilterValue(isWatched, `History`);
    incrementFilterValue(isFavorite, `Favorites`);
  });
  return filterData;
};

const createFilter = (films) => {
  const filtersData = getFiltersData(films);
  let filters = ``;
  filtersData.forEach((filter) => {
    const {title, count} = filter;
    filters += `<a href="#${title}" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>`;
  });

  return (`<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filters}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`);
};

const createSort = () => {
  return (`<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`);
};

export {createFilter, createSort};
