import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MovieClientService } from 'src/app/shared/movie-client.service';
import { Movie } from 'src/app/shared/movie.interfaces';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie = null;

  constructor(private route: ActivatedRoute, private movieClient: MovieClientService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.movieClient.getMovieDetails(params.get('imdbID'))
      )
    )
    .subscribe(movie => {
      this.movie = movie;
    });
  }

}
