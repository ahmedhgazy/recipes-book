import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipes-model';
import { DataPost } from 'src/app/services/recipes/data-post.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { FavoritesPost } from 'src/app/shared/central-posting-data.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss'],
})
export class RecipesItemComponent {
  @Input() recipeItem: Recipe;
  @Input() index: number;
  recipesService: RecipesService = inject(RecipesService);
  router: Router = inject(Router);
  dataPost: FavoritesPost = inject(FavoritesPost);
  ActivatedRoute: ActivatedRoute = inject(ActivatedRoute);

  addToFav() {
    this.recipesService.addRecipesToFav(this.recipeItem);
    alert('recipe added successfully ✔');
    this.dataPost.postFavRecipes();
  }
}
