import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RecipesService } from './recipes.service';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../../models/recipes-model';

@Injectable({
  providedIn: 'root',
})
export class DataPost {
  // https://recipes-book-review-default-rtdb.firebaseio.com/
  recipesService: RecipesService = inject(RecipesService);
  http: HttpClient = inject(HttpClient);

  postRecipes() {
    const recipes = this.recipesService.getRecipes();
    // for override existing recipes
    this.http
      .put<Recipe[]>(
        'https://recipes-book-review-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((recipes) => {
        console.log(recipes);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipes-book-review-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          this.recipesService.resetRecipes(recipes);
        })
      );
  }
}
