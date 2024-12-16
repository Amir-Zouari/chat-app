import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  isOnline?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    this.checkStoredSession();
  }

  private checkStoredSession(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  login(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.apiUrl}/users?username=${username}`).subscribe({
        next: (users) => {
          const user = users.find(u => u.username === username && u.password === password);
          if (user) {
            const { password: _, ...userWithoutPassword } = user;
            localStorage.setItem('user', JSON.stringify(userWithoutPassword));
            this.currentUserSubject.next(userWithoutPassword);
            this.isLoggedInSubject.next(true);
            this.userService.setStatusAsOnline(username);
            resolve();
          } else {
            reject(new Error('Invalid credentials'));
          }
        },
        error: (error) => reject(error)
      });
    });
  }

   logout(): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.userService.setStatusAsOffline(currentUser.username);
    }
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  register(email: string, password: string, username: string): Promise<void> {
    const newUser: User = {
      username,
      email,
      password,
      isOnline: true
    };

    return new Promise((resolve, reject) => {
      // First check if username already exists
      this.http.get<User[]>(`${this.apiUrl}/users?username=${username}`).subscribe({
        next: (users) => {
          if (users.length > 0) {
            reject(new Error('Username already exists'));
            return;
          }

          // If username doesn't exist, create new user
          this.http.post<User>(`${this.apiUrl}/users`, newUser).subscribe({
            next: (createdUser) => {
              const { password: _, ...userWithoutPassword } = createdUser;
              localStorage.setItem('user', JSON.stringify(userWithoutPassword));
              this.currentUserSubject.next(userWithoutPassword);
              this.isLoggedInSubject.next(true);
              //this.userService.setStatusAsOnline(username);
              resolve();
            },
            error: (error) => reject(error)
          });
        },
        error: (error) => reject(error)
      });
    });
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}
