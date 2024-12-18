import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../model/User';
import { DateUtils } from '../../utils/DateUtils';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../model/Message';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.css'
})
export class UserItemComponent {
  // @Input({required: true}) isOnline: boolean = false;
  @Input({required: true}) isSelected:boolean = false;

  @Input({required: true}) user: User = new User();

  lastMessage:Message = new Message();
  constructor(private chatService:ChatService){}
  ngOnInit(){
    this.initLastMessage();
  }

  initLastMessage(){
    this.chatService.getLastMessage(this.user).subscribe({
      next: (mess) => this.lastMessage = mess
    })
  }
  formatTimestamp(timestamp?: number): string {
    if(timestamp)
      return DateUtils.formatTimestampToHHMM(timestamp );
    
  
    return '';
  } 
}
