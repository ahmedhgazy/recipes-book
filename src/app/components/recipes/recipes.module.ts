import { NgModule } from '@angular/core';
import { RecipesRouting } from './recipes.rounting.module';
import { RecipesComponent } from './recipes.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailsComponent,
    RecipesEditComponent,
    RecipesItemComponent,
    FavoritesComponent,
  ],

  imports: [RecipesRouting, ReactiveFormsModule, SharedModule, CommonModule],
  exports: [],
})
export class RecipesModule {}
