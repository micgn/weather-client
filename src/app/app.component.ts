import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BackendService} from './backend.service';

declare var Dygraph: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private backend: BackendService) {
  }


  ngOnInit(): void {

    this.backend.chartData();

    const data = `Date,temperature 1,temperature 2,humidity,pressure
2016/01/01 12:30:33,10,20,15,22
2016/01/01 13:10:03,20,10,17,18
2016/01/01 14:00:01,40,30,33,12
`;
    const g = new Dygraph(document.getElementById('chart'), data, {
      legend: 'always',
      labelsSeparateLines: true,
      showRoller: false,
      rollPeriod: 0,
      customBars: false,
      ylabel: 'Temperature (°C)',
      strokeWidth: 3,
      highlightCircleSize: 6,
      series: {
        'humidity': {
          strokeWidth: 1
        }
      },
      colors: ['#cc3300', '#ff9966', 'blue', 'yellow']
    });

  }
}
