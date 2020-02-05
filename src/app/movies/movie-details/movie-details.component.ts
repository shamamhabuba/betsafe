import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieClientService } from 'src/app/shared/movie-client.service';
import { Movie } from 'src/app/shared/movie.interfaces';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass'],
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie = null;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private movieClient: MovieClientService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieClient.getMovieDetails(params.imdbID).subscribe(movie => {
        this.movie = movie;
      });
    });
  }

  backToSearch() {
    this.location.back();
  }
}
