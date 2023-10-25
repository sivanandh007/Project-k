import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  selectedCityID: number = 1; // Change to selectedCityID as a number
  movieFilter: string = '';
  selectedLanguage: string = '';

  // Define a mapping of city IDs to city names
  cityMappings: { [key: number]: string } = {
    1: 'Tenali',
    2: 'Guntur',
    3: 'vijwayawada'
    // Add more city ID to name mappings as needed
  };

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const cityIDParam = this.route.snapshot.paramMap.get('cityID');
    this.selectedCityID = cityIDParam ? +cityIDParam : 0;

    // Fetch movies for the selected city using the cityID
    this.movieService.getMoviesByCity(this.selectedCityID).subscribe(
      (data: any) => {
        if (Array.isArray(data.$values)) {
          this.movies = data.$values;
          this.filteredMovies = this.movies;
        } else {
          console.error('Unexpected data structure:', data);
        }
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  

  filterMovies() {
    if (this.movieFilter) {
      this.filteredMovies = this.movies.filter((movie: any) =>
        movie.title.toLowerCase().includes(this.movieFilter.toLowerCase())
      );
    } else {
      this.filteredMovies = this.movies;
    }
  }

  filterByLanguage(language: string) {
    this.selectedLanguage = language;
    this.filteredMovies = this.movies.filter((movie: any) =>
      movie.language === language
    );
  }

  bookTicket(movie: any) {
    // Implement the logic to book tickets for the selected movie
    // You can navigate to a ticket booking page or handle the booking process here.
  }
}
