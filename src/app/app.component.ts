import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare var Dygraph: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  ngOnInit(): void {

    const data = `Date,A,B
2016/01/01,10,20
2016/07/01,20,10
2016/12/31,40,30
`;
    const g = new Dygraph(document.getElementById('chart'), data, {
      legend: 'always',
      showRoller: false,
      rollPeriod: 0,
      customBars: false,
      ylabel: 'Temperature (°C)',
    });

  }
}
