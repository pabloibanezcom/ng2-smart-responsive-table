import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Daterangepicker } from 'ng2-daterangepicker';
import { TokenInterceptor } from 'ng2-smart-auth';
import { ResponsiveTableComponent } from './responsive-table.component';
import { ResponsiveTablePaginationComponent } from './responsive-table-pagination/responsive-table-pagination.component';
import { ResponsiveService } from './services/responsive.service';
import { DynamicComponentsService } from './services/dynamic-components.service';
import { InjectComponentDirective } from './directives/inject-component.directive';
import { FormatPipe } from './pipes/format.pipe';
import { FilterResponsivePipe } from './pipes/filter-responsive.pipe';
import { ComplexPropertyPipe } from './pipes/complex-property.pipe';
import { ComponentInputsPipe } from './pipes/component-inputs.pipe';

export * from './services/responsive.service';
export * from './models/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    Daterangepicker
  ],
  declarations: [
    ResponsiveTableComponent,
    ResponsiveTablePaginationComponent,
    InjectComponentDirective,
    FormatPipe,
    FilterResponsivePipe,
    ComplexPropertyPipe,
    ComponentInputsPipe,
  ],
  exports: [
    ResponsiveTableComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class Ng2SmartResponsiveTable {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Ng2SmartResponsiveTable,
      providers: [
        HttpClient,
        ResponsiveService,
        DynamicComponentsService,
        DatePipe,
        CurrencyPipe
      ]
    };
  }
}
