import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Repository, User } from '../interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() user?: User | null;
  @Input() repositories: Repository[] = [];
  @Input() languages: string[] = [];
  @Input() error?: string;
  @Input() isLoading?: boolean;
  @Input() isSubmitted?: boolean;

  filterForm!: FormGroup
  filteredRepositories: Repository[] = [];
  languagesSelected: string[] = [];

  orderDesc = false;
  orderAsc = false;
  limit = 0;

  get userRepo() {
    return this.filterForm.get('userRepo') as FormControl;
  }

  ngOnInit() {
    this.initFilterForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['repositories']?.currentValue) {
      this.filteredRepositories = this.repositories;
      this.filterForm?.reset('');
    }
  }

  initFilterForm(): void {
    this.filterForm = new FormGroup({
      userRepo: new FormControl('', [
        Validators.required,
      ])
    });
  }

  filterRepositories() {
    const search = (this.userRepo.value as string)?.toLowerCase() ?? '';
    this.filteredRepositories = this.repositories?.filter(repo => repo.name.toLowerCase().includes(search));
    if (this.languagesSelected.length) {
      this.filteredRepositories = this.filteredRepositories.filter(repo => this.languagesSelected.includes(repo.language));
    }
  }

  compareName(a: Repository, b: Repository) {
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
      return -1;
    }
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return 1;
    }
    return 0;
  }

  compareStars(a: Repository, b: Repository) {
    if (a.stargazers_count < b.stargazers_count) {
      return -1;
    }
    if (a.stargazers_count > b.stargazers_count) {
      return 1;
    }
    return 0;
  }

  orderNameRepository() {
    if (!this.orderAsc && !this.orderDesc) {
      this.orderDesc = true;
    }
    let sortedProducts = this.filteredRepositories.sort(this.compareName);
    if (this.orderDesc) {
      sortedProducts.reverse()
      this.orderDesc = false;
      this.orderAsc = true;
    } else {
      sortedProducts = this.filteredRepositories.sort(this.compareName);
      this.orderAsc = false;
    }
  }

  orderStarsRepository() {
    if (!this.orderDesc && !this.orderAsc) {
      this.orderDesc = true;
    }
    let sortedProducts = this.filteredRepositories.sort(this.compareStars);
    if (this.orderDesc) {
      sortedProducts.reverse()
      this.orderDesc = false;
      this.orderAsc = true;
    } else {
      sortedProducts = this.filteredRepositories.sort(this.compareStars);
      this.orderAsc = false;
    }
  }

  updateLanguageFilter(event: Event, language: string) {
    if ((event.target as any).checked) {
      this.languagesSelected.push(language);
    } else {
      this.languagesSelected = this.languagesSelected.filter(lang => lang !== language);
    }
    this.filterRepositories();
  }
}
