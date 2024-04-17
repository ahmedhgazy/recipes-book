import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipes-model';
import { DataPost } from 'src/app/services/recipes/data-post.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  // animations: [RecipesAnimation],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  RecipeService: RecipesService = inject(RecipesService);
  DataPost: DataPost = inject(DataPost);
  route: ActivatedRoute = inject(ActivatedRoute);
  isLoading: boolean = false;
  RecipesList: Recipe[] = [];
  filterRecipes = [];
  sub: Subscription;
  noItems: string = null;
  searchQuery: string;
  router: Router = inject(Router);
  ngOnInit(): void {
    this.RecipesList = this.route.snapshot.data['recipes'];
    this.RecipeService.getRecipes();
    this.sub = this.RecipeService.recipesSubject.subscribe((recipes) => {
      this.RecipesList = recipes;
    });
    this.route.queryParamMap.subscribe((data) => {
      this.searchQuery = data.get('search');
      this.filterRecipes = [...this.RecipesList];

      if (
        this.searchQuery === undefined ||
        this.searchQuery === '' ||
        this.searchQuery === null
      ) {
        this.filterRecipes = [...this.RecipesList];
      } else {
        this.filterRecipes = this.RecipesList.filter((recipe) =>
          recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        if (this.filterRecipes.length == 0) {
          this.noItems = 'Not items match your search!';
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  searchItem = '';
  onSearch(form: NgForm) {
    this.router.navigate(['/recipes'], {
      queryParams: { search: this.searchItem },
    });
    form.reset();
    this.searchItem = '';
  }
}
