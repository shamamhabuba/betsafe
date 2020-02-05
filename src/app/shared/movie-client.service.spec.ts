import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { MovieClientService } from './movie-client.service';

describe('MovieClientService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieClientService],
    })
  );
  afterEach(inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));

  it('should be created', () => {
    const service: MovieClientService = TestBed.get(MovieClientService);
    expect(service).toBeTruthy();
  });

  it('should get movies when found', inject(
    [HttpTestingController, MovieClientService],
    (httpMock: HttpTestingController, movieClient: MovieClientService) => {
      const mockMovies = [
        {
          imdbID: '1',
          Title: 'Test Movie 1',
          Poster: 'test.jpg',
          Type: 'Movie',
          Year: '2000',
        },
        {
          imdbID: '2',
          Title: 'Test Movie 2',
          Poster: 'test.jpg',
          Type: 'Movie',
          Year: '1987',
        },
        {
          imdbID: '3',
          Title: 'Test Movie 3',
          Poster: 'test.jpg',
          Type: 'Movie',
          Year: '1995',
        },
      ];
      const mockMovieListResponse = {
        Search: mockMovies,
        totalResults: '3',
        Response: 'True',
      };

      movieClient.getSearchedMovies('test', '1').subscribe(response => {
        expect(JSON.stringify(response.Search)).toEqual(
          JSON.stringify(mockMovieListResponse.Search)
        );
        expect(response.totalResults).toBe('3');
        expect(response.Response).toBe('True');
      });
      const mockUrl = movieClient.url + '&s=test&page=1';
      const mockReq = httpMock.expectOne(mockUrl);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toBe('json');

      mockReq.flush(mockMovieListResponse);
    }
  ));

  it('should return error when movies not found', inject(
    [HttpTestingController, MovieClientService],
    (httpMock: HttpTestingController, movieClient: MovieClientService) => {
      const mockMovieListResponse = {
        Response: 'False',
      };

      movieClient.getSearchedMovies('test_test', '1').subscribe(response => {
        expect(response.Response).toBe('False');
      });
      const mockUrl = movieClient.url + '&s=test_test&page=1';
      const mockReq = httpMock.expectOne(mockUrl);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toBe('json');

      mockReq.flush(mockMovieListResponse);
    }
  ));

  it('should get movie details', inject(
    [HttpTestingController, MovieClientService],
    (httpMock: HttpTestingController, movieClient: MovieClientService) => {
      const mockMovie = {
        imdbID: '1',
        Title: 'Test Movie 1',
        Poster: 'test.jpg',
        Type: 'Movie',
        Year: '2000',
        Plot: 'Test plot',
        imdbRating: '6.0',
        Runtime: '100 min',
        Genre: 'Action',
      };

      movieClient.getMovieDetails('1').subscribe(response => {
        expect(response).toEqual(mockMovie);
      });
      const mockUrl = movieClient.url + '&i=1';
      const mockReq = httpMock.expectOne(mockUrl);

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toBe('json');

      mockReq.flush(mockMovie);
    }
  ));
});
