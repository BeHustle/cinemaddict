export default class MovieModel {
  constructor(data) {
    this.id = parseInt(data.id, 10);
    this.comments = data.comments;
    this.countComments = data.comments ? data.comments.length : 0;

    this.title = data.film_info.title;
    this.originalTitle = data.film_info.alternative_title;
    this.poster = data.film_info.poster;
    this.genres = data.film_info.genre;
    this.description = data.film_info.description;
    this.director = data.film_info.director;
    this.writers = data.film_info.writers;
    this.actors = data.film_info.actors;
    this.ageRating = data.film_info.age_rating;
    this.rating = data.film_info.total_rating;
    this.duration = data.film_info.runtime;
    this.countries = [data.film_info.release.release_country];
    this.date = new Date(data.film_info.release.date);

    this.isFavorite = data.user_details.favorite;
    this.isWatched = data.user_details.already_watched;
    this.inWatchlist = data.user_details.watchlist;
    this.watchingDate = new Date(data.user_details.watching_date);
  }

  toRAW() {
    return {
      "id": this.id.toString(),
      "comments": this.comments,
      "film_info": {
        "title": this.title,
        "alternative_title": this.originalTitle,
        "poster": this.poster,
        "genre": this.genres,
        "description": this.description,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "age_rating": this.ageRating,
        "total_rating": this.rating,
        "runtime": this.duration,
        "release": {
          "release_country": this.countries[0],
          "date": this.date.toJSON()
        }
      },
      "user_details": {
        "favorite": this.isFavorite,
        "already_watched": this.isWatched,
        "watchlist": this.inWatchlist,
        "watching_date": this.watchingDate.toJSON()
      }
    };
  }

  static parseMovie(data) {
    return new MovieModel(data);
  }

  static parseMovies(data) {
    return data.map(MovieModel.parseMovie);
  }
}
