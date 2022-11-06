import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { catchError, of } from 'rxjs';
import { switchMap, tap, finalize } from 'rxjs/operators';

import { UserService } from '../services';
import { Repository, User } from '../interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() userEvt = new EventEmitter<User | null>();
  @Output() repositoriesEvt = new EventEmitter<Repository[]>();
  @Output() languagesEvt = new EventEmitter<string[]>();
  @Output() errorEvt = new EventEmitter<string>();
  @Output() isLoadingEvt = new EventEmitter<boolean>();
  @Output() isSubmittedEvt = new EventEmitter<boolean>();

  errorMessage?: string;
  userForm!: FormGroup;

  get userName() {
    return this.userForm.get('userName') as FormControl;
  }

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required])
    });
  }

  searchUser(): void {
    const userName = this.userName.value;
    this.resetSearchResult();

    this.userService.searchUser(userName).pipe(
      tap((user) => this.userEvt.emit(user)),
      switchMap((user) => this.userService.searchRepos(userName)),
      tap((repositories) => {
        const languages = Array.from(new Set(repositories.map(repo => repo.language).filter(v => !!v)));
        this.repositoriesEvt.emit(repositories);
        this.languagesEvt.emit(languages);
      }),
      catchError(error => {
        const errorMessage = (error.status === 404) ? 'Usuario no encontrado, inténtelo de nuevo' : 'Error, inténtelo de nuevo';
        this.errorEvt.emit(errorMessage);
        return of(error);
      }),
      finalize(() =>this.isLoadingEvt.emit(false))
    ).subscribe();
    
    this.isSubmittedEvt.emit(true);
  }

  private resetSearchResult() {
    this.isLoadingEvt.emit(true);
    this.userEvt.emit(null);
    this.repositoriesEvt.emit([]);
    this.languagesEvt.emit([]);
  }
}
