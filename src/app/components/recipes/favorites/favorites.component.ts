import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipes-model';
import { FavoritesPost } from 'src/app/services/recipes/favDataPost.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  sub: Subscription;
  RecipesService: RecipesService = inject(RecipesService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  favPost: FavoritesPost = inject(FavoritesPost);
  ngOnInit(): void {
    this.recipes = this.RecipesService.getFavRecipes();

    this.recipes = this.route.snapshot.data['favRecipes'];
    this.sub = this.RecipesService.favRecipesSub.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  navToDetails(index: number) {
    this.router.navigate(['recipes', index]);
  }

  deleteFavRecipe(index: number) {
    this.RecipesService.deleteFavRecipe(index);
    this.favPost.postFavRecipes();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
