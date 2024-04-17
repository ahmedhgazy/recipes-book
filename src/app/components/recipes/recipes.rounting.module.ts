import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { FavoritesComponent } from './favorites/favorites.component';
import {
  authGuard,
  favResolver,
  resolver,
} from 'src/app/services/auth/recipes.guard';
authGuard;
const routes: Route[] = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [authGuard],
    resolve: { recipes: resolver },

    children: [
      {
        path: '',
        component: RecipesListComponent,
        pathMatch: 'full',
        resolve: { recipes: resolver },
      },
      {
        path: 'fav',
        component: FavoritesComponent,
        resolve: { favRecipes: favResolver },
      },
      { path: 'new', component: RecipesEditComponent },
      {
        path: ':id',
        component: RecipesDetailsComponent,
        resolve: { recipes: resolver },
      },
      {
        path: ':id/edit',
        component: RecipesEditComponent,
        resolve: { recipes: resolver },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRouting {}
