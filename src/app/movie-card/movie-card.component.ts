import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Services
import {
  AddFavoriteMovieService,
  GetMoviesService,
} from '../fetch-api-data.service';
// Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Components
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: GetMoviesService,
    public addFavoriteMovie: AddFavoriteMovieService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  // Fetches all movies from API
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  // Adds movie to user's list of favorites
  onAddFavoriteMovie(id: string): void {
    this.addFavoriteMovie.addFavorite(id).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 2000,
      });
    });
  }

  // Modal with movie description
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { synopsis },
    });
  }

  // Modal with movie director information
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth },
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
    });
  }

  refresh(): void {
    this.router.navigate(['/movies']).then(() => {
      window.location.reload();
    });
  }

  logoutUser(): void {
    localStorage.clear();
  }
}
