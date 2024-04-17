import { NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredients.model';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  IngredientsList: Ingredient[] = [];
  @ViewChild('form', { static: true }) myForm: NgForm;
  index: number;
  editMode: boolean = false;
  ShoppingService: ShoppingListService = inject(ShoppingListService);
  sub: Subscription;

  ngOnInit(): void {
    this.sub = this.ShoppingService.storeIngredientIndex.subscribe((index) => {
      this.editMode = true;
      this.index = index;

      if (this.editMode) {
        this.initForm();
      }
    });
  }

  initForm() {
    const selectedIngredient = this.ShoppingService.getSelectedIngredient(
      this.index
    );
    console.log(selectedIngredient);

    this.myForm.setValue({
      name: selectedIngredient.name,
      amount: selectedIngredient.amount,
    });
  }

  onSubmit() {
    const name = this.myForm.value['name'];
    const amount = this.myForm.value['amount'];

    if ((name == '' || undefined) && (amount == '' || undefined)) {
      return;
    }
    const Ingredients = new Ingredient(name, amount);
    if (this.editMode) {
      this.ShoppingService.updateIngredients(this.index, Ingredients);
      this.editMode = false;
    } else {
      this.ShoppingService.AddIngredients(Ingredients);
    }

    this.myForm.reset();
  }

  deleteIngredient() {
    this.ShoppingService.deleteIngredient(this.index);
    this.editMode = false;
    this.myForm.reset();
  }

  clearIngredients() {
    this.ShoppingService.clearIngredient();
    this.editMode = false;
    this.myForm.reset();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
