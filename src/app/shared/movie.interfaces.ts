export interface Movie {
  imdbID: string;
Title: string;
Year: string;
Type: string;
Poster: string;
Plot: string;
imdbRating: string;
Runtime: string;
Genre: string;
}

export interface MovieListResponse {
  Search: Movie[];
  Response: 'True';


totalResults: '';
}
