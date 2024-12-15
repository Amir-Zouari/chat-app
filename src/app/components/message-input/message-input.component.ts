import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MessageInputComponent {
  @Output() sendMessage = new EventEmitter<string>();
  messageText: string = '';

  constructor() {}

  onSendMessage(): void {
    const trimmedMessage = this.messageText.trim();
    if (trimmedMessage) {
      this.sendMessage.emit(trimmedMessage);
      this.messageText = ''; // Clear the input after sending
    }
  }
}
