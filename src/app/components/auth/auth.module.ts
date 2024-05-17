import { Injectable, NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { authGuard } from './auth.guard';

@Injectable({
  providedIn: 'root',
})
@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    SharedModule,
  
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        canActivate: [authGuard],
      },
    ]),
  ],
  exports: [],
})
export class AuthModule {}
