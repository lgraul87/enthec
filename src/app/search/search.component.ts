import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() submitted: EventEmitter<any> = new EventEmitter();
  
  userForm!: FormGroup;

  userSubmitted: any = false;

  get userName() {
    return this.userForm.get('userName');
  }

  userAvatar: string = "";
  userFullName: string = "";
  bio: string = "";

  repositoryLength: number = 0;

  repositories: any = [];

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

  searchUser(form: FormGroup) {
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
          this.userFullName = user.name;
          this.bio = user.bio;
          this.service.searchRepos(form.value.userName).subscribe({
            next: repositories => {
              this.repositories = repositories;
              this.repositoryLength = repositories.length;
              this.repositorySize.emit(this.repositoryLength);
              this.repositoryData.emit(this.repositories);
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

  cleanSubmit() {
    this.userSubmitted = false;
    this.submitted.emit(this.userSubmitted);
  }
}