import Util from "./Util";

export default class FilmsData {
  constructor() {
    this._YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365;
    this._now = new Date();
    this._filmsData = {
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
    this._commentData = {
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
      possibleDates: [this._now.getTime() - this._YEAR_IN_MS, this._now.getTime()],
    };
  }

  _getRandomComment() {
    const {authors, possibleDates, possibleTextLength, emojis, texts} = this._commentData;
    const author = Util.getRandomArrayElement(authors);
    const text = Util.shuffleArray(texts)
      .slice(0, Util.getRandomNumber(...possibleTextLength))
      .join(`. `);
    const emoji = Util.getRandomArrayElement(emojis);
    const date = new Date(Util.getRandomNumber(...possibleDates));
    return {author, text, emoji, date};
  }

  getRandomFilm() {
    const title = Util.getRandomArrayElement(this._filmsData.titles);
    const originalTitle = Util.getRandomArrayElement(this._filmsData.originalTitles);
    const poster = Util.getRandomArrayElement(this._filmsData.posters);
    const genres = Util.shuffleArray(this._filmsData.genresData)
      .slice(0, Util.getRandomNumber(...this._filmsData.possibleGenres));
    const description = Util.shuffleArray(this._filmsData.descriptions)
      .slice(0, Util.getRandomNumber(...this._filmsData.possibleDescriptionLength))
      .join(`. `);
    const director = Util.getRandomArrayElement(this._filmsData.directors);
    const writers = Util.shuffleArray(this._filmsData.writersData)
      .slice(0, Util.getRandomNumber(...this._filmsData.possibleWriters));
    const actors = Util.shuffleArray(this._filmsData.actorsData)
      .slice(0, Util.getRandomNumber(...this._filmsData.possibleActors));
    const countries = Util.shuffleArray(this._filmsData.countriesData)
      .slice(0, Util.getRandomNumber(...this._filmsData.possibleCountries));
    const ageRating = Util.getRandomArrayElement(this._filmsData.ageRatings);
    const rating = Util.getRandomNumber(...this._filmsData.possibleRating, 10);
    const date = new Date(Util.getRandomNumber(...this._filmsData.possibleDates));
    const duration = Util.getRandomNumber(...this._filmsData.possibleDurations);
    const isFavorite = Util.getRandomBoolean();
    const isWatched = Util.getRandomBoolean();
    const inWatchlist = Util.getRandomBoolean();

    const comments = [];
    for (let i = 0; i < Util.getRandomNumber(...this._filmsData.possibleComments); i++) {
      const comment = this._getRandomComment;
      comments.push(comment);
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
  }
}
