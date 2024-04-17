import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
AuthService;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.autoLogIn();
  }
}
