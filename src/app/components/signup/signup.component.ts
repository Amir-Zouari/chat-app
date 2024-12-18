import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterModule,
  ],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isSubmitted: boolean = false;
  errorMessage: string | null = null;

 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    this.isSubmitted = true;
    if (this.signupForm.valid) {
      try {
        this.isSubmitted = false;
        const { username, password } = this.signupForm.value;
        // Using username as email for demo purposes
        await this.authService.register(
          username + '@example.com',
          password,
          username
        );
        // Navigate to chat after successful registration
        this.router.navigate(['/chat']);
      } catch (error) {
        this.errorMessage = (`${error}`.substring(7) || 'An unexpected error occurred');
        console.error('Registration failed:', error);
      }
    }
  }
}
