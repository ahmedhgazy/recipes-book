import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  AuthService,
  ResponsePayload,
} from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  AuthService: AuthService = inject(AuthService);
  // @ViewChild('form', { static: true }) form: NgForm;
  isLoading = false;
  error = null;
  isLogIn: boolean = true;
  router: Router = inject(Router);
  sub: Subscription;
  toggleRegistering() {
    this.isLogIn = !this.isLogIn;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    let Obs: Observable<ResponsePayload>;
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLogIn) {
      Obs = this.AuthService.SignIn(email, password);
    } else {
      Obs = this.AuthService.signUp(email, password);
    }
    // console.log(email, password);
    this.sub = Obs.subscribe(
      (userData) => {
        this.router.navigate(['/recipes']);
        this.isLoading = false;
        console.log(userData);
      },
      (error) => {
        this.isLoading = false;
        // console.log(error);
        this.error = error;
      }
    );
    form.reset();
  }
  cancelError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
