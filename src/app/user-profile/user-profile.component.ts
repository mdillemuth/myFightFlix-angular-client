import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { RemoveAccountComponent } from '../remove-account/remove-account.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  favoriteMovieIds: any[] = [];
  favoriteMovies: any[] = [];
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  editUserData(): void {}

  removeAccount(): void {
    this.dialog.open(RemoveAccountComponent);
  }

  // Fetches all movies to reference favoriteMovieIds with
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie) => {
        if (this.favoriteMovieIds.includes(movie._id))
          this.favoriteMovies.push(movie);
      });
      return this.favoriteMovies;
    });
  }

  // Fetches favorite movies from user's profile information
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((response: any) => {
      this.favoriteMovieIds = response[0].FavoriteMovies;
    });
    setTimeout(() => {
      this.getMovies();
    }, 100);
  }

  // Adds or removes movie from user's list of favorites
  onToggleFavoriteMovie(id: string): any {
    if (this.favoriteMovieIds.includes(id)) {
      this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favoriteMovieIds.indexOf(id);
      return this.favoriteMovieIds.splice(index, 1);
    } else {
      this.fetchApiData.addFavorite(id).subscribe((response: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    return this.favoriteMovieIds.push(id);
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
