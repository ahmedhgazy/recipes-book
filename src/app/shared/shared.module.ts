import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinner } from './loading-spinner/loading-spinner';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
@NgModule({
  declarations: [NotFoundComponent, HeaderComponent, LoadingSpinner],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [LoadingSpinner, HeaderComponent, CommonModule, FormsModule],
})
export class SharedModule {}
