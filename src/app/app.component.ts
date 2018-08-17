import {Component, OnInit} from '@angular/core';
import {BackendService} from './backend.service';

declare var Dygraph: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  tableHeaders: Array<string> = [];
  t1Values: Array<{ value: number, timestamp: number }> = [];
  hValues: Array<{ value: number, timestamp: number }> = [];
  pValues: Array<{ value: number, timestamp: number }> = [];


  constructor(private backend: BackendService) {
  }


  ngOnInit(): void {
    this.draw();
  }


  private draw() {

    /*    const data = `Date,temperature 1,temperature 2,humidity,pressure
2016/01/01 12:30:33,10,20,15,22
2016/01/01 13:10:03,20,10,17,18
2016/01/01 14:00:01,40,30,33,12
`;

    const data2 = [
      [1, 10, 100],
      [2, 20, 80],
      [3, 50, 60],
      [4, 70, 80],
      {
        labels: ['x', 'A', 'B']
      }
    ];*/

    this.backend.chartData().subscribe(chartData => {

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


        const data = chartData['data'];

        // map first column to date object
        const mappedData = data.map(col => [new Date(col[0])].concat(col.slice(1)));

        const g = new Dygraph(document.getElementById('chart'), mappedData, {
          legend: 'never',
          labelsSeparateLines: true,
          showRoller: false,
          rollPeriod: 0,
          customBars: false,
          ylabel: 'Temperature (°C)',
          strokeWidth: 2,
          highlightCircleSize: 0,
          series: {
            'TEMPERATURE_1': {
              axis: 'y2'
            },
            'HUMIDITY': {
              strokeWidth: 1
            },
            'PRESSURE': {
              strokeWidth: 1
            }
          },
          axes: {
            y: {
              axisLabelFormatter: function (y) {
                return y.toFixed(0);
              }
            },
            y2: {
              axisLabelFormatter: function (y) {
                return y.toFixed(0);
              }
            }
          },
          colors: ['#cc3300', '#ff9966', 'blue', 'green'],
          labels: ['Date'].concat(chartData['series'])
        });

        const start = new Date(data[0][0]);
        const end = new Date(data[data.length - 1][0]);

        start.setDate(start.getDate() + 1);
        start.setMinutes(0);
        start.setHours(0);
        start.setSeconds(0);

        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const annotations = [];
        while (start < end) {
          annotations.push({
            series: 'TEMPERATURE_1',
            x: start.getTime(),
            shortText: weekDays[start.getDay()],
            text: weekDays[start.getDay()],
            width: 30,
            height: 15
          });
          start.setDate(start.getDate() + 1);
        }

        g.setAnnotations(annotations);

      }
    );

    // reload every 2 minutes
    setTimeout(() => this.draw(), 120 * 1000);

  }

  private addCol(minMax: object, select1: string, select2: string, pushTo: Array<{ value: number, timestamp: number }>) {
    const x = minMax[select1][select2];
    pushTo.push({value: x['value'], timestamp: x['time']});
  }
}
