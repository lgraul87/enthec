import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User, Repository } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  searchUser(name: string) {
    return this.http.get<User>(`${environment.apiUrl}${name}`);
  }

  searchRepos(name: string) {
    return this.http.get<Repository[]>(`${environment.apiUrl}${name}/repos`);
  }
}
