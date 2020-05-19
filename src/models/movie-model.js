export default class MovieModel {
  constructor(data) {
    this.id = data.id;
    this.title = data.film_info.title;
    this.originalTitle = data.film_info.alternative_title;
    this.poster = data.film_info.poster;
    this.genres = data.film_info.genre;
    this.description = data.film_info.description;
    this.director = data.film_info.director;
    this.writers = data.film_info.writers;
    this.actors = data.film_info.actors;
    this.countries = [data.film_info.release.release_country];
    this.ageRating = data.film_info.age_rating;
    this.rating = data.film_info.total_rating;
    this.date = new Date(data.film_info.release.date);
    this.duration = data.film_info.runtime;
    this.isFavorite = data.user_details.favorite;
    this.isWatched = data.user_details.already_watched;
    this.inWatchlist = data.user_details.watchlist;
    this.countComments = data.comments ? data.comments.length : 0;
  }

  toRAW() {
    return {

    };
  }

  static parseMovie(data) {
    return new MovieModel(data);
  }

  static parseMovies(data) {
    return data.map(MovieModel.parseMovie);
  }

  static clone(data) {
    return new MovieModel(data.toRAW());
  }
}
