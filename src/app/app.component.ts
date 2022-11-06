import { Component } from '@angular/core';

import { Repository, User } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user?: User | null; 
  repositories: Repository[] = [];
  languages: string[] = [];
  error?: string;
  isLoading?: boolean;
  isSubmitted?: boolean;
  
  setUser(user: User | null) {
    this.user = user;
  }

  setRepositories(repositories: Repository[]) {
    this.repositories = repositories;
  }

  setLanguages(languages: string[]) {
    this.languages = languages;
  }

  setError(error: string) {
    this.error = error;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsSubmitted(isSubmitted: boolean) {
    this.isSubmitted = isSubmitted;
  }
}
