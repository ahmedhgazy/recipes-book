import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipes-model';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { Params } from '@angular/router';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { DataPost } from 'src/app/services/recipes/data-post.service';
@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss'],
})
export class RecipesDetailsComponent implements OnInit {
  index: number;
  recipe: Recipe;
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  recipesService: RecipesService = inject(RecipesService);
  ShoppingService: ShoppingListService = inject(ShoppingListService);
  dataPost: DataPost = inject(DataPost);
  ngOnInit() {
    const recipes = this.route.snapshot.data['recipes'];

    this.recipe = recipes[this.index];

    this.route.params.subscribe((param: Params) => {
      this.index = +param['id'];
      this.recipe = this.recipesService.GetSelectedRecipe(this.index);
    });
  }

  deleteRecipe() {
    this.recipesService.deleteRecipe(this.index);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  // pass Ingredients to shoppingList
  ToShoppingList() {
    this.ShoppingService.RDIngredientsSub.next(this.recipe.ingredients);
    alert('Ingredients Added Successfully to shoppingList ✔');
  }
}
