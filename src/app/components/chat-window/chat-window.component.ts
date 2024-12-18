import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MessageBubbleComponent } from '../message-bubble/message-bubble.component';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../user-list/user-list.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { ChatService} from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { RecipientStatusComponent } from "../recipient-status/recipient-status.component";
import { User } from '../../model/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    MatSidenavModule,
    MessageBubbleComponent,
    CommonModule,
    UserListComponent,
    MessageInputComponent,
    HeaderComponent,
    RecipientStatusComponent
],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  messages$ = this.chatService.messages$;
  currentUser = this.authService.getCurrentUser();
  selectedRecipientId!: number | null;
  selectedRecipient!: User;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Initialize with no selected recipient to show public messages
    //this.chatService.setSelectedRecipient(this.currentUser?.id as number);
    // const x = this.chatService.getSelectedRecipientFromCache();
    // if(x != null)
    //   this.chatService.setSelectedRecipientx(x);
  
  }

  onSendMessage(content: string) {
    if (content.trim()) {
      this.chatService.sendMessage(content, this.selectedRecipient.id as number).subscribe({
        next: (message) => {
          console.log('Message sent to recipient ID:', this.selectedRecipient.id, 'Message:', message);
        },
        error: (error) => console.error('Error sending message:', error)
      });
    }
  }

  isOwnMessage(senderId: number): boolean {
    return this.currentUser?.id !== undefined && this.currentUser.id === senderId;
  }

  // onUserSelected(userId: number) {
  //   this.selectedRecipientId = userId;
  //   this.chatService.setSelectedRecipient(userId);
  //   //this.chatService.getMessages();
    
  // }

  onUserSelectedx(user: User){
    this.selectedRecipientId = user.id ?? null;
    this.selectedRecipient = user;
    this.chatService.setSelectedRecipientx(user);
  }
  // Exit private chat and return to public chat
  // selectRecipient(userId: number | null ) {
  //   this.selectedRecipientId = userId;
  //   this.chatService.setSelectedRecipient(this.selectedRecipientId);  // Use undefined consistently
  // }

}
