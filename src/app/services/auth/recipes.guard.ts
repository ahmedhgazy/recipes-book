import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RecipesService } from '../recipes/recipes.service';
import { DataPost } from '../recipes/data-post.service';
import { FavoritesPost } from '../recipes/favDataPost.service';
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
        return true;
      }
      return router.createUrlTree(['auth']);
    })
  );
};

export const resolver = () => {
  const recipesService: RecipesService = inject(RecipesService);
  const dataPost: DataPost = inject(DataPost);
  const recipes = recipesService.getRecipes();
  if (recipes.length == 0) {
    return dataPost.fetchRecipes();
  } else {
    return recipes;
  }
};

export const favResolver = () => {
  // const recipesService: RecipesService = inject(RecipesService);
  // const favRecipes = recipesService.getFavRecipes();
  const favoritesPost: FavoritesPost = inject(FavoritesPost);
  return favoritesPost.getFavRecipes();
};
