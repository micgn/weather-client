import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tableHeaders: Array<string> = [];
  t1Values: Array<{ value: number, timestamp: number }> = [];
  hValues: Array<{ value: number, timestamp: number }> = [];
  pValues: Array<{ value: number, timestamp: number }> = [];


  constructor() {
  }

  ngOnInit() {
  }

  display(chartData: any) {

    this.tableHeaders = [];
    this.t1Values = [];
    this.hValues = [];
    this.pValues = [];

    const current = chartData['current'];

    this.tableHeaders.push('current');

    if (current != null) {
      if (current['TEMPERATURE_1'] != null) {
        const t1 = current['TEMPERATURE_1'];
        this.t1Values.push({value: t1['value'], timestamp: t1['time']});
      } else {
        this.t1Values.push({value: null, timestamp: null});
      }

      if (current['HUMIDITY'] != null) {
        const h = current['HUMIDITY'];
        this.hValues.push({value: h['value'], timestamp: h['time']});
      } else {
        this.hValues.push({value: null, timestamp: null});
      }

      if (current['PRESSURE'] != null) {
        const p = current['PRESSURE'];
        this.pValues.push({value: p['value'], timestamp: p['time']});
      } else {
        this.pValues.push({value: null, timestamp: null});
      }
    }

    const minMax = chartData['minMax'];
    for (const mm of minMax) {
      const db = mm['daysBack'];
      if (db < 999) {
        this.tableHeaders.push(db + ' days');
      } else {
        this.tableHeaders.push('overall');
      }
      this.addCol(mm, 'min', 'TEMPERATURE_1', this.t1Values);
      this.addCol(mm, 'max', 'TEMPERATURE_1', this.t1Values);
      this.addCol(mm, 'min', 'HUMIDITY', this.hValues);
      this.addCol(mm, 'max', 'HUMIDITY', this.hValues);
      this.addCol(mm, 'min', 'PRESSURE', this.pValues);
      this.addCol(mm, 'max', 'PRESSURE', this.pValues);
    }
  }

  private addCol(minMax: object, select1: string, select2: string, pushTo: Array<{ value: number, timestamp: number }>) {
    const x = minMax[select1][select2];
    pushTo.push({value: x['value'], timestamp: x['time']});
  }

}
