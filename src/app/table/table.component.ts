import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  repositoryLength = 0;

  @Input()
  repositories: any = [];

  @Input()
  userSubmitted: any = false;

  @Input()
  userAvatar = "";

  @Input()
  userName = "";

  filterForm!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.initFilterForm();
  }

  initFilterForm() {
    this.filterForm = new FormGroup({
      userRepo: new FormControl('', [
        Validators.required,
      ])
    });
  }

  filterRepositories(form: FormGroup) {
    let array : any = [];
    let va: Boolean = false;
    if (form.valid) {
      this.repositories.forEach((element: any) => {
        if (element.name.includes(form.value.userRepo)) {
          array.push(element);
          va = true;
        }
      });

      if (va == true) {
        this.repositories = array;
        va = false;
      }
    }
  }
}
