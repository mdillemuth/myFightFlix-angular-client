import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Service that contains backend logic
import { FetchApiDataService } from '../fetch-api-data.service';
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
    public fetchApiData: FetchApiDataService,
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
    this.fetchApiData.addFavorite(id).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 2000,
      });
    });
  }

  // Opens modal with movie synopsis information
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { synopsis },
    });
  }

  // Opens modal with movie director information
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio, birth },
    });
  }

  // Opens modal with movie genre information
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
    });
  }
}
