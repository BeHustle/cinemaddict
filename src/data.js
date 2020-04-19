import {getRandomNumber, getRandomArrayElement, shuffleArray, getRandomBoolean} from './util';

const YEAR = 1000 * 60 * 60 * 24 * 365;
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
  genres: [`Drama`, `Fantastic`, `Melodrama`, `Horror`, `Thriller`, `Film-Noir`, `Mystery`],
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
  writers: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`, `Crhis Partymaker`, `Stas Pyeha`],
  actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`, `Samuel Jackson`, `Christian Bale`, `Alan Rickman`],
  countries: [`USA`, `Russia`, `New Zeland`, `Great Britain`, `Spain`, `China`, `Japan`],
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
  possibleDates: [now.getTime() - YEAR, now.getTime()],
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
  const {
    titles, originalTitles, posters, genres, descriptions,
    directors, writers, actors, countries, ageRatings, possibleWriters, possibleActors, possibleGenres, possibleRating,
    possibleDates, possibleDurations, possibleComments, possibleDescriptionLength, possibleCountries,
  } = filmsData;
  const title = getRandomArrayElement(titles);
  const originalTitle = getRandomArrayElement(originalTitles);
  const poster = getRandomArrayElement(posters);
  const genre = shuffleArray(genres)
    .slice(0, getRandomNumber(...possibleGenres));
  const description = shuffleArray(descriptions)
    .slice(0, getRandomNumber(...possibleDescriptionLength))
    .join(`. `);
  const director = getRandomArrayElement(directors);
  const writer = shuffleArray(writers)
    .slice(0, getRandomNumber(...possibleWriters));
  const actor = shuffleArray(actors)
    .slice(0, getRandomNumber(...possibleActors));
  const country = shuffleArray(countries)
    .slice(0, getRandomNumber(...possibleCountries));
  const ageRating = getRandomArrayElement(ageRatings);
  const rating = getRandomNumber(...possibleRating, 10);
  const date = new Date(getRandomNumber(...possibleDates));
  const duration = getRandomNumber(...possibleDurations);
  const isFavorite = getRandomBoolean();
  const isWatched = getRandomBoolean();
  const inWatchlist = getRandomBoolean();

  const comments = [];
  for (let i = 0; i < getRandomNumber(...possibleComments); i++) {
    comments.push(getRandomComment());
  }

  return {
    title, originalTitle, poster, genre,
    description, director, writer, actor, country,
    ageRating, rating, date, duration, comments,
    isFavorite, isWatched, inWatchlist
  };
};

export {getRandomFilm};
