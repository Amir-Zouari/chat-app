import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { User } from '../../model/User';
import { interval, switchMap } from 'rxjs';


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


    interval(1000) 
      .pipe(switchMap(() => this.chatService.selectedRecipientx$))
      .subscribe({
        next: () => this.getRecipient()
        
  })
  }

  getRecipient(){
    this.chatService.selectedRecipientx$.subscribe({
      next: (recipient) => {
        if(recipient.id)
        this.chatService.getSelectedRecipient(recipient.id).subscribe({
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
