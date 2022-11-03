import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usurepo = "https://api.github.com/users/lgraul87/repos";
  constructor(private http: HttpClient) { }

  searchUsers(name: string) { 
    return this.http.get<any>(this.usurepo);
  }
}
