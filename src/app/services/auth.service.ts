
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor() {
   
   }
   setUserData(userData:Record<string,string>): void {
    window.localStorage.setItem('user-data', JSON.stringify(userData));
  }
  getUserData(): string | undefined {
    return window.localStorage.getItem('user-data') ?? undefined;
  }
  getParseUserData():Record<string,string> {
        return JSON.parse(window.localStorage.getItem('user-data') || '{}'); 
  }
  removeUserData(): void {
     window.localStorage.removeItem('user-data') 
  }
  
}
