import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
export const authGuard = ():
  | Boolean
  | Promise<Boolean | UrlTree>
  | Observable<Boolean | UrlTree>
  | UrlTree => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return auth.user.pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;
      if (isAuth) {
        router.createUrlTree(['/']);
        return false;
      }
      return true;
    })
  );
};
