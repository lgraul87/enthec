import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  search = "https://api.github.com/users/";
  constructor(private http: HttpClient) { }

  searchUsers(name: string) {
    return this.http.get<any>(this.search + name);
  }

  searchRepos(name: string) {
    return this.http.get<any>(this.search + name + "/repos");
  }
}
