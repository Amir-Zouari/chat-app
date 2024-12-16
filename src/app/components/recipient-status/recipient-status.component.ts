import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { User } from '../../model/User';


@Component({
  selector: 'app-recipient-status',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './recipient-status.component.html',
  styleUrl: './recipient-status.component.css'
})
export class RecipientStatusComponent {
  
  recipienttUser: User = new User();
  constructor(private chatService: ChatService) {}

  ngOnInit(){
    this.getRecipient();
  }

  getRecipient(){
    this.chatService.selectedRecipient$.subscribe({
      next: (id) => {
        this.chatService.getSelectedRecipient(id).subscribe({
          next:(user) => this.recipienttUser = user
        })
      }
    })
  }
  getUserStatusAsText(): string{
    if(this.recipienttUser?.isOnline)
      return "Active Now"
    else
      return "Offline"
  }
}
