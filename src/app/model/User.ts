export class User {
    id?: number;
    username: string;
    email: string;
    password: string;
    isOnline: boolean;
  
    constructor();
    constructor(payload: Partial<User>);
    constructor(payload?: Partial<User>) {
      this.id = payload?.id ?? undefined;
      this.username = payload?.username ?? '';
      this.email = payload?.email ?? '';
      this.password = payload?.password ?? '';
      this.isOnline = payload?.isOnline?? false;
    }
}