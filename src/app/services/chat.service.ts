import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService} from './auth.service';
import { User } from '../model/User';
import { Message } from '../model/Message';

// export interface Message {
//   id?: string;
//   content: string;
//   senderId: number;
//   recipientId?: number | null;  // Optional: if not set, message is public
//   senderUsername: string;
//   timestamp: number;  // Unix timestamp in milliseconds
// }

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/messages';
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  // private selectedRecipientSubject = new BehaviorSubject<number | null>(null);
  // selectedRecipient$ = this.selectedRecipientSubject.asObservable();
  
  private selectedRecipientSubjectx = new BehaviorSubject<User>(new User());
  selectedRecipientx$ = this.selectedRecipientSubjectx.asObservable();

  private isSelectedRecipientOnline = new BehaviorSubject<boolean>(false);
  isSelectedRecipientOnline$ = this.isSelectedRecipientOnline.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    // Poll for new messages every 2 seconds
    interval(1000).pipe(
      switchMap(() => this.getMessages())

    ).subscribe(messages => {
      // Merge new messages with existing ones, avoiding duplicates
      const existingMessages = this.messagesSubject.value;
      const allMessages = [...existingMessages];
      
      messages.forEach(newMsg => {
        if (!existingMessages.some(existingMsg => existingMsg.id === newMsg.id)) {
          allMessages.push(newMsg);
        }
      });
      
      // this.messagesSubject.next(allMessages); skip this to fix chat messages
      this.messagesSubject.next(messages);
    });

    
  }

  getMessages(): Observable<Message[]> {
    const currentUser = this.authService.getCurrentUser();
    return this.http.get<Message[]>(this.apiUrl).pipe(
      map(messages => {
        console.log('Fetched messages:', messages);
        const selectedRecipient = this.selectedRecipientSubjectx.value;
        return messages.filter(message => {
          if (selectedRecipient) {
            console.log(selectedRecipient)
            // Show only private messages between current user and selected recipient
            return (message.senderId === currentUser?.id && message.recipientId === selectedRecipient.id) ||
                   (message.senderId === selectedRecipient.id && message.recipientId === currentUser?.id);
          } else {
            //show nothing
            return false; 
          }
        });
      }),
      map(messages => messages.sort((a, b) => a.timestamp - b.timestamp))
    );
  }

 
  sendMessage(content: string, recipientId: number): Observable<Message> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const message: Message = {
      content,
      senderId: currentUser.id!,
      recipientId,
      senderUsername: currentUser.username,
      timestamp: Date.now()
    };

    console.log('Sending message:', message);
    return this.http.post<Message>(this.apiUrl, message).pipe(
      map(newMessage => {
        const currentMessages = this.messagesSubject.value;
        console.log('Received new message:', newMessage);
        // Only add the message if it's not already in the list
        if (!currentMessages.some(msg => msg.id === newMessage.id)) {
          this.messagesSubject.next([...currentMessages, newMessage]);
        }
        this.addLastMessage(newMessage,this.selectedRecipientSubjectx.value,this.authService.getCurrentUser() as User)
        return newMessage;
      }),
     
    );
  }

  addLastMessage(message: Message,recipient: User, sender: User){
    // recipient.lastMessage = message;
    // sender.lastMessage = message;
   
    this.http.get<User[]>(`http://localhost:3000/users?id=${recipient.id}`).subscribe({
      next: (rec) => {
        let user: User = new User(rec[0]);
        user.lastMessage = message;
        this.http.put<User>(`http://localhost:3000/users/${user.id}`,user).subscribe();
      } 
    });

    
    this.http.get<User[]>(`http://localhost:3000/users?id=${sender.id}`).subscribe({
      next: (sender) => {
        let user: User = new User(sender[0]);
        user.lastMessage = message;
        this.http.put<User>(`http://localhost:3000/users/${user.id}`,user).subscribe();
      } 
    });
    // this.http.put<User>(`http://localhost:3000/users/${recipient.id}`,recipient).subscribe({
    //   next: () => console.log("done")
    // });
    // this.http.put<User>(`http://localhost:3000/users/${sender.id}`,sender).subscribe();
  }

  // setSelectedRecipient(recipientId: number|null) {
  //   this.selectedRecipientSubject.next(recipientId);
  // }

  setSelectedRecipientx(recipient:User){
    this.setSelectedRecipientInCache(recipient);
    this.selectedRecipientSubjectx.next(recipient);
  }
  getSelectedRecipient(id:number): Observable<User>{
  
    return this.http.get<User>('http://localhost:3000/users/'+id);
    
  }

  setSelectedRecipientInCache(user: User){
    if(this.getSelectedRecipientFromCache() != null)
    localStorage.setItem('selectedRecipient', JSON.stringify(user));
  }
  getSelectedRecipientFromCache(): User | null{
   
    let xy;
    try{
      xy = JSON.parse(localStorage.getItem('selectedRecipient') as string);
      return new User(xy);
    } 
    catch(err){
      return null;
    }

  }

 
}