import { Injectable, inject } from '@angular/core';
import { Recipe } from 'src/app/models/recipes-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipesSubject = new Subject<Recipe[]>();

  private RecipesList: Recipe[] = [];

  favRecipe: Recipe[] = [];

  favRecipesSub = new Subject<Recipe[]>();
  constructor() {
    /*
    const favRecipes = window.localStorage.getItem('favRecipes');
    if (favRecipes) {
      this.favRecipe = JSON.parse(favRecipes);
    }
   */
  }

  getRecipes() {
    return this.RecipesList.slice();
  }

  addRecipes(newRecipe: Recipe) {
    this.RecipesList.push(newRecipe);
    this.recipesSubject.next(this.RecipesList);
    // this.updateRecipesLocalStorage();
  }

  GetSelectedRecipe(index: number) {
    return this.RecipesList[index];
  }

  // override the existing recipes while put new items
  resetRecipes(newRecipes: Recipe[]) {
    this.RecipesList = newRecipes;
    this.recipesSubject.next(this.RecipesList);
    // this.updateLocalStorage();
  }

  /*
 private updateLocalStorage() {
    localStorage.setItem('favRecipes', JSON.stringify(this.favRecipe));
  }
  private updateRecipesLocalStorage() {
    localStorage.setItem('recipesList', JSON.stringify(this.RecipesList));
  }
  */

  updateRecipes(index: number, newRecipe: Recipe) {
    this.RecipesList[index] = newRecipe;
    this.recipesSubject.next(this.RecipesList);
  }

  deleteRecipe(index: number) {
    this.RecipesList.splice(index, 1);
    this.recipesSubject.next(this.RecipesList);
  }

  //*****************************Favorites************************//

  // store favorites recipes in local storage

  getFavRecipes() {
    return this.favRecipe.slice();
  }

  addRecipesToFav(newRecipe) {
    this.favRecipe.push(newRecipe);
    this.favRecipesSub.next(this.favRecipe);
    // this.updateLocalStorage();
  }

  deleteFavRecipe(index) {
    this.favRecipe.splice(index, 1);
    // localStorage.removeItem(this.favRecipe[index])
    // this.updateLocalStorage();
    this.favRecipesSub.next(this.favRecipe.slice());
  }

  resetFavorites(newRecipes: Recipe[]) {
    this.favRecipe = newRecipes;
    this.favRecipesSub.next(this.favRecipe);
  }
}
