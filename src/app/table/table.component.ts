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

  @Input()
  bio = "";

  @Input()
  uniqueLanguage: any = [];

  filterForm!: FormGroup
  orderDesc = false;
  orderAsc = false;
  lenguajes: any = [];
  repositoryTemplate: any = [];
  limit = 0;

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
    let array: any = [];
    let filterActions: Boolean = false;
    if (form.valid) {
      this.repositories.forEach((element: any) => {
        if (element.name.includes(form.value.userRepo)) {
          array.push(element);
          filterActions = true;
        }
      });

      if (filterActions == true) {
        this.repositories = array;
        filterActions = false;
      }
    }
  }

  orderNameRepository() {
    if (this.orderDesc == false && this.orderAsc == false) {
      this.orderDesc = true;
    }
    let sortedProducts = this.repositories.sort(this.compareName);
    if (this.orderDesc == true) {
      sortedProducts.reverse()
      this.orderDesc = false;
      this.orderAsc = true;
    } else {
      sortedProducts = this.repositories.sort(this.compareName);
      this.orderAsc = false;
    }
  }

  compareName(a: any, b: any) {
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
      return -1;
    }
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return 1;
    }
    return 0;
  }

  orderStarsRepository() {
    if (this.orderDesc == false && this.orderAsc == false) {
      this.orderDesc = true;
    }
    let sortedProducts = this.repositories.sort(this.compareStars);
    if (this.orderDesc == true) {
      sortedProducts.reverse()
      this.orderDesc = false;
      this.orderAsc = true;
    } else {
      sortedProducts = this.repositories.sort(this.compareStars);
      this.orderAsc = false;
    }
  }

  compareStars(a: any, b: any) {
    if (a.stargazers_count < b.stargazers_count) {
      return -1;
    }
    if (a.stargazers_count > b.stargazers_count) {
      return 1;
    }
    return 0;
  }

  sendLanguage(event: any, stringLanguage: any) {
    const check = event.target.checked;
    const stringLanguageObject = stringLanguage;
    if (this.repositoryTemplate.length == 0) {
      this.repositories.forEach((element: any) => {
        this.repositoryTemplate.push(element);
      });
      this.limit = this.repositoryLength;
      this.repositories = [];
    }

    if (this.repositories.length >= this.limit) {
      this.repositories = [];
    }

    if (check == true) {
      this.repositoryTemplate.forEach((element: any) => {
        if (element.language == stringLanguageObject.language) {
          this.repositories.push(element);
        }
      }
      )
    }



    if (check == false) {
      let arr: any = [];
      for (let index = 0; index < this.repositories.length; index++) {
        const element = this.repositories[index];
        if (element.language != stringLanguageObject.language) {
          arr.push(element)
        }
      }
      this.repositories = arr;
    }


    if (this.repositories.length == 0) {
      this.repositories = this.repositoryTemplate;
    }
    this.repositories.sort(this.compareName)

  }
}
