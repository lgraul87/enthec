import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
