import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Input() selectedUserId?: number | null;
  @Output() userSelected = new EventEmitter<number>();


  users$ = this.userService.Users$;
  //currentUser$ = this.userService.currentUser$;
  currentUser: any;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    // Initial fetch of online users
    //this.userService.updateUserActivity('');
    this.currentUser = this.authService.getCurrentUser();
  }

  onUserClick(userId: number) {
    this.userSelected.emit(userId);
  }
}
