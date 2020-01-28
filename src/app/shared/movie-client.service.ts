import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movie, MovieListResponse } from './movie.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MovieClientService {

  url = 'http://www.omdbapi.com/?apikey=f79aeba3';

  public searchString: string;

  public movies: Movie[];

  public response: string;


  constructor(private httpClient: HttpClient) { }

  getSearchedMovies(searchString: string, page: string) {
    this.searchString = searchString;
    return this.httpClient.get<MovieListResponse>(
      `${this.url}&s=${searchString}&page=${page}`);
  }

  getMovieDetails(imdbID: string) {
    return this.httpClient.get<Movie>(`${this.url}&i=${imdbID}`);
  }
}
