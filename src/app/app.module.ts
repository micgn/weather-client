import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BackendService} from './backend.service';
import {TableComponent} from './table/table.component';
import {ChartComponent} from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
