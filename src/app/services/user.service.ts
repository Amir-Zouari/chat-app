import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval, map } from 'rxjs';
import { User } from '../model/User';
import { ChatService } from './chat.service';


// interface OnlineUser extends User {
//   lastActive?: number;
// }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  private userListSubject = new BehaviorSubject<User[]>([]);
  users$ = this.userListSubject.asObservable();

  constructor(private http: HttpClient) {
    interval(1000).subscribe(() => {
      this.updateOnlineStatus();
    });
  }

  setStatusAsOffline(username: string) {
    const currentUsers = this.userListSubject.value;
    const updatedUsers = currentUsers.map((user) => {
      if (user.username === username) {
        return { ...user, isOnline: false };
      }
      return user;
    });

    this.userListSubject.next(updatedUsers);

    // Find the user to update on the server
    const userToUpdate = updatedUsers.find(
      (user) => user.username === username
    );
    if (userToUpdate) {
      this.http
        .put(`${this.apiUrl}/users/${userToUpdate.id}`, userToUpdate)
        .subscribe();
    }
  }

  setStatusAsOnline(username: string) {
    const currentUsers = this.userListSubject.value;
    const updatedUsers = currentUsers.map((user) => {
      if (user.username === username) {
        return { ...user, isOnline: true };
      }
      return user;
    });

    this.userListSubject.next(updatedUsers);

    // Find the user to update on the server
    const userToUpdate = updatedUsers.find(
      (user) => user.username === username
    );
    if (userToUpdate) {
      this.http
        .put(`${this.apiUrl}/users/${userToUpdate.id}`, userToUpdate)
        .subscribe();
    }
  }

  private updateOnlineStatus() {
    this.getAllUsers().subscribe((users) => {
      this.userListSubject.next(users);
      //console.log('registered users:', users);
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getFirstUserFromTheList(){
    console.log(this.userListSubject.value[0])
    return this.userListSubject.value[0];
  }
  
}
