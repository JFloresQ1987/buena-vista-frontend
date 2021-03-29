import { Component, Input, OnInit } from '@angular/core';
// import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styles: [
  ]
})
export class DoughnutChartComponent implements OnInit {

  @Input() title: string = "";
  @Input('labels') labels: Label[];
  @Input('data') data: MultiDataSet;
  @Input('colors') colors: Color[];

  // public doughnutChartLabels: Label[] = ['CPP', 'Deficiente', 'Dudoso', 'Pérdida'];
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100, 50],
  // ];
  // // public doughnutChartType: ChartType = 'doughnut';
  // public colors: Color[] = [
  //   { backgroundColor: ['#06d79c', '#ffb22b', '#ea4c89', '#ef5350'] }
  // ];

  constructor() { }

  ngOnInit(): void {
  }

}
