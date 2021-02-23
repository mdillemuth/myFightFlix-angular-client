import { Injectable } from '@angular/core';
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

/* *===== USER ROUTES *===== */
// User Registration
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}

  // API Call
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Registration Error: Please try again');
  }
}

// User Login
@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  constructor(private http: HttpClient) {}

  // API Call
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Login Error: Invalid Credentials');
  }
}

// Get User Information
// NOTE: This route returns user's favorite movies
@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  constructor(private http: HttpClient) {}

  // API Call
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

  // Non-Typed Response Extraction
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

// Update User Information
@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  constructor(private http: HttpClient) {}

  // API Call
  editUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-Typed Response Extraction
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

// Delete User Account
@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  constructor(private http: HttpClient) {}

  // API Call
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/:Username', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-Typed Response Extraction
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

// Add Movie To User's Favorites
@Injectable({
  providedIn: 'root',
})
export class AddFavoriteMovieService {
  constructor(private http: HttpClient) {}

  // API Call
  addFavoriteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + 'users/:Username/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-Typed Response Extraction
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

// Remove Movie From User's Favorites
@Injectable({
  providedIn: 'root',
})
export class RemoveFavoriteMovieService {
  constructor(private http: HttpClient) {}

  // API Call
  addFavoriteMovie(): Observable<any> {
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
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

/* *===== MOVIE ROUTES =====* */
// Get All Movies
@Injectable({
  providedIn: 'root',
})
export class GetMoviesService {
  constructor(private http: HttpClient) {}

  // API Call
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

  // Non-Typed Response Extraction
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

// Get Single Movie
@Injectable({
  providedIn: 'root',
})
export class GetMovieByTitleService {
  constructor(private http: HttpClient) {}

  // API Call
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:MovieID', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-Typed Response Extraction
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

// Get Director Information
@Injectable({
  providedIn: 'root',
})
export class GetDirectorService {
  constructor(private http: HttpClient) {}

  // API Call
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

  // Non-Typed Response Extraction
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}

// Get Genre Information
@Injectable({
  providedIn: 'root',
})
export class GetGenreService {
  constructor(private http: HttpClient) {}

  // API Call
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

  // Non-Typed Response Extraction
  private extractResponseData(res: Response | Object): Response | Object {
    const body = res;
    return body || {};
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened: please try again later.');
  }
}
