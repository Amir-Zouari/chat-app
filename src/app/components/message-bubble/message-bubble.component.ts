import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../services/chat.service';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MessageBubbleComponent {
  @Input() message!: Message;
  @Input() isOwnMessage: boolean = false;
  @Input() isPrivate: boolean = false;

  formatTimestamp(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString();
  }
}
