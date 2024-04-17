import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';
export interface ResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  http: HttpClient = inject(HttpClient);

  // Sign Up
  signUp(email: string, password: string) {
    return this.http
      .post<ResponsePayload>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyByabZnnXOO9QHr9DYC7yfag9F7zUixff0',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((user) => {
          this.StoringUser(
            user.email,
            user.localId,
            user.idToken,
            +user.expiresIn
          );
        }),
        catchError(this.handleAuthError)
      );
  }

  // Sign In
  SignIn(email: string, password: string) {
    return this.http
      .post<ResponsePayload>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByabZnnXOO9QHr9DYC7yfag9F7zUixff0',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((user) => {
          this.StoringUser(
            user.email,
            user.localId,
            user.idToken,
            +user.expiresIn
          );
        }),
        catchError(this.handleAuthError)
      );
  }

  autoLogIn() {
    const LoadedUser: {
      email: string;
      id: string;
      _token: string;
      ExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!LoadedUser) {
      return;
    }
    const newUser = new User(
      LoadedUser.email,
      LoadedUser.id,
      LoadedUser._token,
      new Date(LoadedUser.ExpirationDate)
    );
    // check the token
    if (newUser.token) {
      this.user.next(newUser);
      const expirationDate =
        new Date(newUser.ExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDate);
    }
  }

  private StoringUser(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const newUser = new User(
      email,
      id,
      token,
      new Date(new Date().getTime() + expiresIn * 1000)
    );
    this.user.next(newUser);
    localStorage.setItem('userData', JSON.stringify(newUser));
    this.autoLogOut(expiresIn * 1000);
  }

  private handleAuthError(errorResponse: HttpErrorResponse) {
    let error = 'There is no internet connection';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(error);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        error = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        error =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        error =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        error = 'he password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        error = 'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(error);
  }
  router: Router = inject(Router);
  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = null;
  }
  timer: any;
  autoLogOut(expirationDate: number) {
    this.timer = setTimeout(() => {
      this.logOut();
    }, expirationDate);
  }
}
