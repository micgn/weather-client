import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {BackendService} from './backend.service';
import {ChartComponent} from './chart/chart.component';
import {TableComponent} from './table/table.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(TableComponent) table;
  @ViewChild(ChartComponent) chart;


  constructor(private backend: BackendService) {
  }

  ngAfterViewInit(): void {
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
        this.table.display(chartData);
        this.chart.display(chartData);
      }
    );

    // reload every 2 minutes
    setTimeout(() => this.draw(), 120 * 1000);

  }

}
