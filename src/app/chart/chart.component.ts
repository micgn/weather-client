import {Component, OnInit} from '@angular/core';

declare var Dygraph: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


  display(chartData: any) {

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
      highlightCircleSize: 0,
      series: {
        'TEMPERATURE_1': {
          strokeWidth: 2,
          axis: 'y'
        },
        'HUMIDITY': {
          strokeWidth: 1,
          axis: 'y'
        },
        'PRESSURE': {
          strokeWidth: 1,
          axis: 'y'
        }
      },
      axes: {
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

}
