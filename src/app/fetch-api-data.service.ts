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

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-fight-flix.herokuapp.com/api/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  private isAuthenticated = false;
  private token: string = '';

  /**
   *
   * @param http
   * @param router
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * @returns {string} the token from local storage
   */
  getToken() {
    return this.token;
  }

  /**
   *
   * @returns {boolean} the authentication status of the user
   */
  getIsAuth() {
    return this.isAuthenticated;
  }

  /**
   * Can be called to set user authentication to true
   */
  setAuth() {
    this.isAuthenticated = true;
  }

  /**
   *
   * @returns {string} username from local storage
   */
  getUsername() {
    const username = localStorage.getItem('user');
    return username;
  }

  /**
   * Logs out user by removing credentials from local storage
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  /**
   * Handles user login HTTP request
   * @param userDetails
   * @returns
   */
  login(userDetails: any): Observable<any> {
    this.isAuthenticated = true;
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Calls API to get user account information
   * @param user
   * @returns
   */
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to register new user account
   * @param userDetails
   * @returns
   */
  createAccount(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to edit user account details
   * @param userDetails
   * @returns
   */
  editAccount(userDetails: any): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `users/${user}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to remove user account
   * @returns
   */
  removeAccount(): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to fetch all movies in database
   * @returns
   */
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

  /**
   * API call to get movie by title
   * @returns
   */
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

  /**
   * API call to get director information
   * @returns
   */
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

  /**
   * API call to get genre information
   * @returns
   */
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

  /**
   * API call to add movie to user's list of favorites
   * @param id
   * @returns
   */
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

  /**
   * API call to remove movie from user's list of favorites
   * @param id
   * @returns
   */
  removeFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Non-Typed Response Extraction
   * @param res
   * @returns
   */
  extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  /**
   * Handles errors
   * @param error
   * @returns
   */
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
