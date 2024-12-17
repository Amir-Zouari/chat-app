import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../model/User';
import { DateUtils } from '../../utils/DateUtils';

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

  formatTimestamp(timestamp?: number): string {
    if(timestamp)
      return DateUtils.formatTimestampToHHMM(timestamp );
    
  
    return '';
  } 
}
