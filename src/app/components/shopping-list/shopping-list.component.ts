import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredients.model';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  sub: Subscription;
  ShoppingService: ShoppingListService = inject(ShoppingListService);

  ngOnInit(): void {
    this.sub = this.ShoppingService.IngredientsSub.subscribe(
      (IngredientsList) => {
        this.ingredients = IngredientsList;
      }
    );

    this.ShoppingService.RDIngredientsSub.subscribe((newIngredients) => {
      this.ShoppingService.addNewIngredients(newIngredients);
    });

    this.ingredients = this.ShoppingService.getIngredients();
  }
  passIndex(i) {
    this.ShoppingService.storeIngredientIndex.next(i);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
