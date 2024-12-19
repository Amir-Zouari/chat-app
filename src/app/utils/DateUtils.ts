export class DateUtils{

    static formatTimestampToHHMM(timestamp: number): string {
        const date = new Date(timestamp);
        const hours: string = String(date.getHours()).padStart(2, '0'); 
        const minutes: string = String(date.getMinutes()).padStart(2, '0'); 
    
        return `${hours}:${minutes}`;
      }
}