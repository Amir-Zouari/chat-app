import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

import { UserItemComponent } from "../user-item/user-item.component";
import { User } from '../../model/User';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, UserItemComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Input() selectedUserId?: number | null;
  @Output() userSelected = new EventEmitter<User>();


  users$ = this.userService.users$;
  //currentUser$ = this.userService.currentUser$;
  currentUser: any;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    // Initial fetch of online users
    //this.userService.updateUserActivity('');
    this.currentUser = this.authService.getCurrentUser();
  }

  onUserClick(user: User) {
    this.userSelected.emit(user);
  }
}
