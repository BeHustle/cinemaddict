import Util from "../Util";

const createTopRatedFilms = () => {
  return (`<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container" id="top-rated">
      </div>
    </section>`);
};

const createMostCommentedFilms = () => {
  return (`<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container" id="most-commented">
      </div>
    </section>`);
};

const createFilm = (film) => {
  const CONTROLS_ACTIVE_BTN_CLASS = `film-card__controls-item--active`;
  const {
    title, rating, date, duration,
    genres, description, poster, comments,
    isFavourite, isWatched, inWatchlist,
  } = film;
  const filmYear = date.getFullYear();
  const filmDuration = Util.getFormatDuration(duration);
  const filmGenre = genres.join(`, `);
  const countComments = `${comments.length} comments`;
  const favoriteFilm = isFavourite ? CONTROLS_ACTIVE_BTN_CLASS : ``;
  const watchedFilm = isWatched ? CONTROLS_ACTIVE_BTN_CLASS : ``;
  const watchlistFilm = inWatchlist ? CONTROLS_ACTIVE_BTN_CLASS : ``;

  return (`<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${filmYear}</span>
            <span class="film-card__duration">${filmDuration}</span>
            <span class="film-card__genre">${filmGenre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${countComments}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistFilm}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedFilm}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteFilm}">Mark as favorite</button>
          </form>
        </article>`);
};

const createFilmGenres = (genres) => {
  return genres.reduce((acc, cv) => {
    return acc + `<span class="film-details__genre">${cv}</span>`;
  }, ``);
};

const createFilmControls = (isWatched, inWatchlist, isFavorite) => {
  const watchlist = inWatchlist ? `Already in watchlist` : `Add to watchlist`;
  const watched = isWatched ? `Already watched` : `Add to watched films`;
  const favorite = isFavorite ? `Already in favorites` : `Add to favorites`;
  return `<section class="film-details__controls">
        <input ${inWatchlist ? `checked` : ``} type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${watchlist}</label>

        <input ${isWatched ? `checked` : ``} type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">${watched}</label>

        <input ${isFavorite ? `checked` : ``} type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${favorite}</label>
   </section>`;
};

const createCommentsSection = (comments) => {
  const commentsTemplate = comments ? comments.reduce((acc, cv) => {
    const {author, text, emoji, date} = cv;
    return acc + `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${Util.getCommentFormatDate(date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
  }, ``) : ``;
  return (`<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
            ${commentsTemplate}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>`);
};

const createFilmPopup = (film) => {
  const {
    title, originalTitle, rating, director, writers, poster,
    actors, date, duration, countries, genres, description,
    ageRating, isFavorite, isWatched, inWatchlist, comments,
  } = film;
  const filmWriters = writers.join(`, `);
  const filmActors = actors.join(`, `);
  const filmReleaseDate = `${date.getDate()} ${Util.getMonthName(date)} ${date.getFullYear()}`;
  const filmDuration = Util.getFormatDuration(duration);
  const filmCountries = countries.join(`, `);
  const filmGenresTemplate = createFilmGenres(genres);
  const filmControlsSection = createFilmControls(isWatched, inWatchlist, isFavorite);
  const filmComments = createCommentsSection(comments);

  return (`<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmWriters}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmActors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${filmReleaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmDuration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmCountries}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${filmGenresTemplate}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>
      ${filmControlsSection}

    </div>

    <div class="form-details__bottom-container">
        ${filmComments}
    </div>
  </form>
</section>`);
};

const createFilmsSection = () => {
  return (`<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      </div>
    </section>
  </section>`);
};

export {
  createTopRatedFilms,
  createMostCommentedFilms,
  createFilm,
  createFilmPopup,
  createFilmsSection
};
