import { Injectable } from '@angular/core';
import { Ingredient } from '../../models/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor() {
    const ingredients = localStorage.getItem('ingredients');
    if (ingredients) {
      this.IngredientsList = JSON.parse(ingredients);
    }
  }

  IngredientsList: Ingredient[] = [];
  IngredientsSub = new Subject<Ingredient[]>();
  storeIngredientIndex = new Subject<number>();

  getIngredients() {
    return this.IngredientsList.slice();
  }

  getSelectedIngredient(index: number) {
    return this.IngredientsList[index];
  }

  AddIngredients(ingredient: Ingredient) {
    this.IngredientsList.push(ingredient);
    this.IngredientsSub.next(this.IngredientsList);
    this.updateLocalStorage();
  }

  updateIngredients(index: number, newIngredient: Ingredient) {
    this.IngredientsList[index] = newIngredient;
    this.IngredientsSub.next(this.IngredientsList);
    this.updateLocalStorage();
  }

  deleteIngredient(index: number) {
    this.IngredientsList.splice(index, 1);
    this.IngredientsSub.next(this.IngredientsList);
    this.updateLocalStorage();
  }

  clearIngredient() {
    this.IngredientsList = [];
    this.IngredientsSub.next(this.IngredientsList);
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('ingredients', JSON.stringify(this.IngredientsList));
  }

  RDIngredientsSub = new Subject<Ingredient[]>();

  addNewIngredients(newIngredients: Ingredient[]) {
    this.IngredientsList.push(...newIngredients);
    this.IngredientsSub.next(this.IngredientsList);
    this.updateLocalStorage();
  }
}
