import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-fight-flix.herokuapp.com/api/';

// Rewrite
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  private isAuthenticated = false;
  private token: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // Returns token in local storage
  getToken() {
    return this.token;
  }

  // Returns boolean of whether user is authenticated
  getIsAuth() {
    return this.isAuthenticated;
  }

  setAuth() {
    this.isAuthenticated = true;
  }

  // Returns username of active session
  getUsername() {
    const username = localStorage.getItem('user');
    return username;
  }

  // Logout
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  // API call to login user
  login(userDetails: any): Observable<any> {
    this.isAuthenticated = true;
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // API call to get user account information
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to register new user account
  createAccount(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // API call to edit user account details
  editAccount(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to remove user's account
  removeAccount(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to fetch all movies in database
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get movie by title
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get director information
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/:Director', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to get genre information
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/Genre', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to add movie to user's list of favorites
  addFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/${id}`, id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // API call to remove movie from user's list of favorites
  removeFavorite(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/:Username/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-Typed Response Extraction
  extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  // Error Handling
  handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Unexpected Error: Please try again');
  }
}
