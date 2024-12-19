export class Message{

    id?: string;
    content: string;
    senderId: number;
    recipientId: number | null;  
    senderUsername: string;
    timestamp: number; 

    constructor();
    constructor(payload: Partial<Message>);
    constructor(payload?: Partial<Message>) {
        this.id = payload?.id ?? undefined;
        this.content = payload?.content ?? 'Start a Conversion';
        this.senderId = payload?.senderId ?? 0;
        this.recipientId = payload?.recipientId ?? null;
        this.senderUsername = payload?.senderUsername ?? '';
        this.timestamp = payload?.timestamp ?? new Date().getTime()
    }
}