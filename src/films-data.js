import {getRandomBoolean, getRandomNumber} from './utils/random';
import {getRandomArrayElement, shuffleArray} from './utils/array';

const YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365;
const now = new Date();
const filmsData = {
  titles: [
    `The Dance of Life`,
    `Made of each Other`,
    `Popeye meets Sinbad`,
    `Sagebrush trail`,
    `Santa Claus Conquers the Martians`,
    `The great Flamarion`,
    `The man with the golden arm`,
  ],
  originalTitles: [
    `The Dance of Life`,
    `Made of each Other`,
    `Popeye meets Sinbad`,
    `Sagebrush trail`,
    `Santa Claus Conquers the Martians`,
    `The great Flamarion`,
    `The man with the golden arm`,
  ],
  posters: [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ],
  genresData: [`Drama`, `Fantastic`, `Melodrama`, `Horror`, `Thriller`, `Film-Noir`, `Mystery`],
  descriptions: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
    `Cras aliquet varius magna, non porta ligula feugiat eget`,
    `Fusce tristique felis at fermentum pharetra`,
    `Aliquam id orci ut lectus varius viverra`,
    `Nullam nunc ex, convallis sed finibus eget sollicitudin eget ante`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`,
  ],
  directors: [`Anthony Mann`, `Robert B Weide`, `Christopher Nolan`, `J J Abrams`],
  writersData: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Crhis Partymaker`, `Stas Pyeha`],
  actorsData: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`, `Samuel Jackson`, `Christian Bale`, `Alan Rickman`],
  countriesData: [`USA`, `Russia`, `New Zeland`, `Great Britain`, `Spain`, `China`, `Japan`],
  ageRatings: [`0+`, `6+`, `12+`, `16+`, `18+`],
  possibleWriters: [1, 3],
  possibleActors: [2, 5],
  possibleGenres: [1, 3],
  possibleRating: [1.0, 10.0],
  possibleDates: [new Date(`1970`).getTime(), new Date(`2020`).getTime()],
  possibleDurations: [65, 190],
  possibleComments: [0, 5],
  possibleDescriptionLength: [1, 5],
  possibleCountries: [1, 3],
};
const commentData = {
  authors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`, `Samuel Jackson`, `Christian Bale`, `Alan Rickman`],
  texts: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
    `Cras aliquet varius magna, non porta ligula feugiat eget`,
    `Fusce tristique felis at fermentum pharetra`,
    `Aliquam id orci ut lectus varius viverra`,
    `Nullam nunc ex, convallis sed finibus eget sollicitudin eget ante`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`,
  ],
  emojis: [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`],
  possibleTextLength: [1, 4],
  possibleDates: [now.getTime() - YEAR_IN_MS, now.getTime()],
};

const getRandomComment = () => {
  const {authors, possibleDates, possibleTextLength, emojis, texts} = commentData;
  const author = getRandomArrayElement(authors);
  const text = shuffleArray(texts)
    .slice(0, getRandomNumber(...possibleTextLength))
    .join(`. `);
  const emoji = getRandomArrayElement(emojis);
  const date = new Date(getRandomNumber(...possibleDates));
  return {author, text, emoji, date};
};

const getRandomFilm = () => {
  const title = getRandomArrayElement(filmsData.titles);
  const originalTitle = getRandomArrayElement(filmsData.originalTitles);
  const poster = getRandomArrayElement(filmsData.posters);
  const genres = shuffleArray(filmsData.genresData)
    .slice(0, getRandomNumber(...filmsData.possibleGenres));
  const description = shuffleArray(filmsData.descriptions)
    .slice(0, getRandomNumber(...filmsData.possibleDescriptionLength))
    .join(`. `);
  const director = getRandomArrayElement(filmsData.directors);
  const writers = shuffleArray(filmsData.writersData)
    .slice(0, getRandomNumber(...filmsData.possibleWriters));
  const actors = shuffleArray(filmsData.actorsData)
    .slice(0, getRandomNumber(...filmsData.possibleActors));
  const countries = shuffleArray(filmsData.countriesData)
    .slice(0, getRandomNumber(...filmsData.possibleCountries));
  const ageRating = getRandomArrayElement(filmsData.ageRatings);
  const rating = getRandomNumber(...filmsData.possibleRating, 10);
  const date = new Date(getRandomNumber(...filmsData.possibleDates));
  const duration = getRandomNumber(...filmsData.possibleDurations);
  const isFavorite = getRandomBoolean();
  const isWatched = getRandomBoolean();
  const inWatchlist = getRandomBoolean();

  const comments = [];
  for (let i = 0; i < getRandomNumber(...filmsData.possibleComments); i++) {
    comments.push(getRandomComment());
  }

  return {
    title,
    originalTitle,
    poster,
    genres,
    description,
    director,
    writers,
    actors,
    countries,
    ageRating,
    rating,
    date,
    duration,
    comments,
    isFavorite,
    isWatched,
    inWatchlist,
  };
};

const getRandomFilms = (count) => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(getRandomFilm());
  }
  return array;
};

export {getRandomFilms};
