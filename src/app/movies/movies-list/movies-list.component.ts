import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieClientService } from 'src/app/shared/movie-client.service';
import { Movie } from 'src/app/shared/movie.interfaces';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.sass'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  searchString = '';

  itemsPerPage = '10';
  page = '0';

  maxSize = '5';

  movies: Movie[] = [];
  totalResults = '0';
  response: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private movieClient: MovieClientService
  ) {}

  ngOnInit() {
    // this.searchString = sessionStorage.getItem('searchString')
    //   ? sessionStorage.getItem('searchString')
    //   : '';
    // this.movies = sessionStorage.getItem('movies')
    //   ? JSON.parse(sessionStorage.getItem('movies'))
    //   : [];
    // this.response = sessionStorage.getItem('response')
    //   ? sessionStorage.getItem('response')
    //   : 'True';

    this.route.queryParams.subscribe(params => {
      this.searchString = params.s;
      this.page = params.page;
      if (this.searchString && this.page) {
        console.log(
          'searcing for -(' + this.searchString + '), page - ' + this.page
        );
        this.searchMovies();
      }
    });
  }
  ngOnDestroy() {
    // sessionStorage.setItem('searchString', this.searchString);
    // sessionStorage.setItem('movies', JSON.stringify(this.movies));
    // sessionStorage.setItem('response', this.response);
  }

  onSubmit() {
    if (!this.searchString) {
      this.resetValues();
    } else {
      this.page = '1';
      console.log(
        'on submit -(' + this.searchString + '), page - ' + this.page
      );
      this.router.navigate([''], {
        queryParams: { s: this.searchString, page: this.page },
        relativeTo: this.route,
      });
    }
  }

  pageChange(event) {
    this.page = event;
    this.router.navigate([''], {
      queryParams: { s: this.searchString, page: this.page },
      relativeTo: this.route,
    });
  }

  searchMovies() {
    this.movieClient
      .getSearchedMovies(this.searchString, this.page)
      .subscribe(response => {
        this.movies = response.Search == null ? [] : response.Search;
        this.totalResults = response.totalResults;
        this.response = response.Response;
      });
  }

  resetValues() {
    this.page = '0';
    this.movies = [];
  }}
