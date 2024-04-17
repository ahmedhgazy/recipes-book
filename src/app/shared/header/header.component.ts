import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataPost } from 'src/app/services/recipes/data-post.service';
import { FavoritesPost } from 'src/app/services/recipes/favDataPost.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  PostService: DataPost = inject(DataPost);
  AuthService: AuthService = inject(AuthService);
  recipesService: RecipesService = inject(RecipesService);
  favPost: FavoritesPost = inject(FavoritesPost);

  ngOnInit(): void {
    this.AuthService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  saveChanges() {
    this.PostService.postRecipes();
  }

  FetchRecipes() {
    this.PostService.fetchRecipes().subscribe();
  }

  LogOtu() {
    this.AuthService.logOut();
  }

  saveFavChanges() {
    this.favPost.postFavRecipes();
  }

  test() {
    this.favPost.getFavRecipes().subscribe();
  }
}
