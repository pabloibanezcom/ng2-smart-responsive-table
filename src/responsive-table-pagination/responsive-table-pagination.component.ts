import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchResult } from '../models/search-result';

@Component({
  selector: 'smart-responsive-table-pagination',
  templateUrl: './responsive-table-pagination.component.html',
  styleUrls: ['./responsive-table-pagination.component.less']
})
export class ResponsiveTablePaginationComponent {

  @Input() searchResult: SearchResult;
  @Output() pageUpdated = new EventEmitter();

  constructor() { }

  goToPage(page: number): void {
    this.pageUpdated.emit(page);
  }

}
