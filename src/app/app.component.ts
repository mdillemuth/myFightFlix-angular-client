import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from './fetch-api-data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'myFlix-Angular-client';

  toggleTheme = new FormControl(false);

  constructor(
    private _renderer: Renderer2,
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  // Handles logic for theme toggling
  ngOnInit() {
    this.toggleTheme.valueChanges.subscribe((toggleValue) => {
      if (toggleValue === true) {
        this._renderer.addClass(document.body, 'dark-theme');
        this._renderer.removeClass(document.body, 'light-theme');
      } else {
        this._renderer.addClass(document.body, 'light-theme');
        this._renderer.removeClass(document.body, 'dark-theme');
      }
    });
  }

  // Handles conditional rendering of sub-nav bar
  isAuth() {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false;
    }
  }

  // Logs user out and redirects to welcome screen
  onLogout(): void {
    this.fetchApiData.logout();
    this.router.navigate(['/welcome']);
  }

  // Navigates user to profile-view
  openProfile(): void {
    this.router.navigate(['/profile']);
  }

  // Navbar logo takes logged in user to movies page or welcome page if not logged in
  backToMain(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/movies']);
    } else {
      this.router.navigate(['/welcome']);
    }
  }

  toMovies(): void {
    this.router.navigate(['/movies']);
  }
}
