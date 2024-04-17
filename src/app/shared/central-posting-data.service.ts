import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/models/recipes-model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { RecipesService } from '../services/recipes/recipes.service';
@Injectable({
  providedIn: 'root',
})
export class FavoritesPost {
  http: HttpClient = inject(HttpClient);
  recipeService: RecipesService = inject(RecipesService);
  auth: AuthService = inject(AuthService);

  postFavRecipes() {
    const userId = this.auth.user.getValue()?.id;
    const favRecipes: Recipe[] = this.recipeService.getFavRecipes();
    this.http
      .put<Recipe[]>(
        `https://recipes-book-review-default-rtdb.firebaseio.com/favorites/${userId}.json`,
        favRecipes
      )
      .subscribe((favRecipes) => {
        console.log(favRecipes);
      });
  }

  getFavRecipes() {
    const userId = this.auth.user.getValue()?.id;
    return this.http
      .get(
        `https://recipes-book-review-default-rtdb.firebaseio.com/favorites/${userId}.json`
      )
      .pipe(
        map((favRecipes: Recipe[]) => {
          return favRecipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((newRecipes: Recipe[]) => {
          console.log(newRecipes);

          this.recipeService.resetFavorites(newRecipes);
        })
      );
  }
}
