import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MessageBubbleComponent } from '../message-bubble/message-bubble.component';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../user-list/user-list.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { ChatService, Message } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { RecipientStatusComponent } from "../recipient-status/recipient-status.component";

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
  selectedRecipientId?: number | null;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Initialize with no selected recipient to show public messages
    this.chatService.setSelectedRecipient(this.currentUser?.id as number);
  
  }

  onSendMessage(content: string) {
    if (content.trim()) {
      this.chatService.sendMessage(content, this.selectedRecipientId).subscribe({
        next: (message) => {
          console.log('Message sent to recipient ID:', this.selectedRecipientId, 'Message:', message);
        },
        error: (error) => console.error('Error sending message:', error)
      });
    }
  }

  isOwnMessage(senderId: number): boolean {
    return this.currentUser?.id !== undefined && this.currentUser.id === senderId;
  }

  onUserSelected(userId: number) {
    this.selectedRecipientId = userId;
    this.chatService.setSelectedRecipient(userId);
    //this.chatService.getMessages();
    
  }

  // Exit private chat and return to public chat
  selectRecipient(userId: number | null ) {
    this.selectedRecipientId = userId;
    this.chatService.setSelectedRecipient(this.selectedRecipientId);  // Use undefined consistently
  }

  isPrivateMessage(message: any): boolean {
    return message.recipientId !== undefined;
  }
}
