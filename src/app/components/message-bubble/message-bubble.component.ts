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
    const date = new Date(timestamp);
    const hours: string = String(date.getHours()).padStart(2, '0'); // Get hours and pad with zero
    const minutes: string = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with zero

    return `${hours}:${minutes}`;
  }
}
