import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredients.model';
import { Recipe } from 'src/app/models/recipes-model';
import { DataPost } from 'src/app/services/recipes/data-post.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss'],
})
export class RecipesEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  editMode: boolean = false;
  recipesService: RecipesService = inject(RecipesService);
  dataPost: DataPost = inject(DataPost);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] != null;
      this.initForm();
    });
  }

  /*
   let recipeName: string = '';
    let RecipesImage: string = '';
    let recipeDesc: string = '';
    let recipePrice: number = null;
    let recipeIngredients = new FormArray([]);

    this.form = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      price: new FormControl(recipePrice, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      imgUrl: new FormControl(RecipesImage, Validators.required),
      desc: new FormControl(recipeDesc, Validators.required),
      ingredients: recipeIngredients,
    });

    if (this.editMode) {
      this.dataPost.fetchRecipes().subscribe((recipes) => {
        const recipe: Recipe = recipes[this.id];
        console.log(recipe);
        RecipesImage = recipe.imgPath;
        recipeName = recipe.name;
        recipePrice = recipe.price;
        recipeDesc = recipe.desc;
        if (recipe['ingredients']) {
          recipe.ingredients.forEach((ingredient) => {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                ]),
              })
            );
          });
        }
        this.form = new FormGroup({
          name: new FormControl(recipeName, Validators.required),
          price: new FormControl(recipePrice, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
          imgUrl: new FormControl(RecipesImage, Validators.required),
          desc: new FormControl(recipeDesc, Validators.required),
          ingredients: recipeIngredients,
        });
      });
    }
  */
  private initForm() {
    let recipeName: string = '';
    let recipePrice: number = null;
    let recipeImg: string = '';
    let recipeDesc: string = '';
    let Ingredients = new FormArray([]);

    if (this.editMode) {
      const recipes: Recipe[] = this.route.snapshot.data['recipes'];
      const recipe: Recipe = recipes[this.id];
      recipeName = recipe.name;
      recipePrice = recipe.price;
      recipeImg = recipe.imgPath;
      recipeDesc = recipe.desc;
      if (recipe.ingredients) {
        const ingredients = recipe.ingredients;
        ingredients.forEach((Ingredient) => {
          Ingredients.push(
            new FormGroup({
              name: new FormControl(Ingredient.name, Validators.required),
              amount: new FormControl(Ingredient.amount, Validators.required),
            })
          );
        });
      }
    }
    this.form = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      price: new FormControl(recipePrice, Validators.required),
      imgUrl: new FormControl(recipeImg, Validators.required),
      desc: new FormControl(recipeDesc, Validators.required),
      ingredients: Ingredients,
    });
  }

  get Ingredients() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  onAddIngredients() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.form.value['imgUrl'],
      this.form.value['name'],
      this.form.value['price'],
      this.form.value['desc'],
      this.form.value['ingredients'],
      this.form.value['title']
    );

    if (this.editMode) {
      this.recipesService.updateRecipes(this.id, newRecipe);
    } else {
      this.recipesService.addRecipes(newRecipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
