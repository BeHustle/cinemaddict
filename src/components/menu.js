const getFiltersData = function (films) {
  const getFilterCount = (title, flag) => {
    return {
      title,
      count: films.filter((film) => film[flag]).length,
    };
  };

  return [
    getFilterCount(`History`, `isWatched`),
    getFilterCount(`Watchlist`, `inWatchlist`),
    getFilterCount(`Favorites`, `isFavorite`),
  ];
};

const createFilter = (films) => {
  const filtersData = getFiltersData(films);
  const initialFilter = `<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>`;
  const filters = filtersData.reduce((acc, cv) => {
    return acc + `<a href="#${cv.title}" class="main-navigation__item">${cv.title} <span class="main-navigation__item-count">${cv.count}</span></a>`;
  }, initialFilter);

  return (`<nav class="main-navigation">
    <div class="main-navigation__items">

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
