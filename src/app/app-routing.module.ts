import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { authGuard } from './services/auth/recipes.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },

  {
    path: 'recipes',
    loadChildren: () =>
      import('./components/recipes/recipes.rounting.module').then(
        (mod) => mod.RecipesRouting
      ),
  },

  {
    path: 'shop',
    loadChildren: () =>
      import('../app/components/shopping-list/shopping-list.module').then(
        (mod) => mod.ShoppingList
      ),
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('../app/components/auth/auth.module').then(
        (mod) => mod.AuthModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
