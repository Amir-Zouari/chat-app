import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatIconModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn = false;
  currentUser: { username: string } | null = null;

  constructor(private authService: AuthService, private router: Router) {
    // Subscribe to auth state changes
    this.authService.isLoggedIn$.subscribe(
      (loggedIn) => (this.isLoggedIn = loggedIn)
    );
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
