import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponsiveService } from './services/responsive.service';
import { ResponsiveTableConfig } from './models/responsive-table-config';
import { SearchResult } from './models/search-result';
import { SearchRequestParams } from './models/search-request-params';
import { Observable } from 'rxjs/Observable';
import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'smart-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss']
})
export class ResponsiveTableComponent implements OnInit {

  @Input() config: ResponsiveTableConfig;
  @Input() components: any;

  public searchResult: SearchResult;
  public sizeCode: string;

  constructor(
    private http: HttpClient,
    private responsiveService: ResponsiveService
  ) {
    this.updateSizeCode(window.screen.width);
  }

  ngOnInit() {
    this.config.search_request_params.filter = this.config.search_request_params.filter || {};
    if (this.config.dateRange) {
      this.config.search_request_params.filter.dateMin = moment(this.config.dateRange.startDate).toISOString();
      this.config.search_request_params.filter.dateMax = moment(this.config.dateRange.endDate).toISOString();
    }
    this.config.search_request_params.page = this.config.search_request_params.page || 1;
    this.refresh();
  }

  refresh() {
    this.http.post<SearchResult>(this.config.api_url, this.config.search_request_params).subscribe(res => {
      this.searchResult = res;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSizeCode(event.target.innerWidth);
  }

  updateSizeCode(innerWidth: number) {
    this.sizeCode = this.responsiveService.getSizeCode(innerWidth);
  }

  updatePage(number: number) {
    this.config.search_request_params.page = number;
    this.refresh();
  }

  selectedDate(event: any) {
    this.config.dateRange.label = event.label !== 'Custom Range' ? event.label : moment(event.start).format('DD MMM YYYY') + ' - ' + moment(event.end).format('DD MMM YYYY');
    this.config.search_request_params.filter.dateMin = moment(event.start).toISOString();
    this.config.search_request_params.filter.dateMax = moment(event.end).toISOString();
    this.refresh();
  }

  sort(property: string) {
    if (this.config.search_request_params.sort === '-' + property) {
      this.config.search_request_params.sort = property;
    } else {
      this.config.search_request_params.sort = '-' + property;
    }
    this.config.search_request_params.page = 1;
    this.refresh();
  }

  search(searchStr: string) {
    if (searchStr === '' || searchStr.length >= this.config.search.min_chars) {
      this.config.search_request_params.filter[this.config.search.property] = searchStr;
      this.refresh();
    }
  }

}
