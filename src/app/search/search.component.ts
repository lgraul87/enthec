import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() repositorySize: EventEmitter<any> = new EventEmitter();
  @Output() repositoryData: EventEmitter<any> = new EventEmitter();
  @Output() repositoryAvatar: EventEmitter<any> = new EventEmitter();
  @Output() repositoryUserName: EventEmitter<any> = new EventEmitter();
  @Output() repositoryBio: EventEmitter<any> = new EventEmitter();
  @Output() repositoryUniqueLenguage: EventEmitter<any> = new EventEmitter();
  @Output() submitted: EventEmitter<any> = new EventEmitter();

  userForm!: FormGroup;
  userSubmitted: Boolean = false;
  userAvatar: string = "";
  userFullName: string = "";
  bio: string = "";
  repositoryLength: number = 0;
  repositories: any = [];

  get userName() {
    return this.userForm.get('userName');
  }

  constructor(private readonly service: UserService) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  private initUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
      ])
    });
  }

  searchUser(form: FormGroup): void {
    this.userSubmitted = true;
    if (form.valid) {
      this.service.searchUsers(form.value.userName).subscribe({
        next: user => {
          console.log(
            "*** User found (Success): The user", user.name
            , "with the id:", user.id
            , "and login like:", user.login
            , "was founded. ***"
          );
          this.userAvatar = user.avatar_url;
          this.repositoryAvatar.emit(this.userAvatar);
          this.userFullName = user.name;
          this.repositoryUserName.emit(this.userFullName);
          this.bio = user.bio;
          this.repositoryBio.emit(this.bio);
          this.service.searchRepos(form.value.userName).subscribe({
            next: repositories => {
              this.repositories = repositories;
              this.repositoryData.emit(this.repositories);
              this.repositoryLength = repositories.length;
              this.repositorySize.emit(this.repositoryLength);
              let allLenguajes: any = [];
              this.repositories.forEach((element: any) => {
                if (element.language) {
                  allLenguajes.push(element.language);
                }
              });
              const uniqueLenguage = allLenguajes.filter(this.onlyUnique);
              this.repositoryUniqueLenguage.emit(uniqueLenguage);
              console.log(
                "The user", form.value.userName,
                "has", this.repositoryLength,
                "repositories");
            },
            error: error => {
              console.log("Error control (line 53 aprox): ", error);
            },
            complete: () => {
              console.log('The searchRepos method was completed');
            }
          });
        },
        error: error => {
          console.log("Error control (line 53 aprox): ", error);
        },
        complete: () => {
          console.log('The searchUsers method was completed');
        }
      })
    }
  }

  cleanSubmit(): void {
    this.userSubmitted = false;
    this.submitted.emit(this.userSubmitted);
  }

  onlyUnique(value: any, index: any, self: any): boolean {
    return self.indexOf(value) === index;
  }
}
