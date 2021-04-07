import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  @Input() eventPretext = '';
  @Input() eventName = '';
  @Input() color = 'rgb(92,184,92)';
  @Input() maxValue = 30;
  @Input() value = 0;
  @Input() buttonText = '';
  @Input() link = '';

  doughnutChartType: ChartType = 'doughnut';
  colors: Color[] = [{ backgroundColor: [this.color, 'grey'] }];
  doughnutChartLabels: Label[] = ['day(s)', 'day(s)'];
  doughnutChartData: SingleDataSet = [this.maxValue - this.value, this.value];
  options: ChartOptions = { cutoutPercentage: 80 };
  centerText = this.value.toString() + ' Days';

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.maxValue && changes.maxValue.currentValue) ||
      (changes.value && changes.value.currentValue)) {

      this.doughnutChartData = [this.maxValue - this.value, this.value];
      this.centerText = this.value.toString() + (this.value > 1 ? ' Days' : ' Day');
    }

    if (changes.color && changes.color.currentValue) {
      this.colors = [{ backgroundColor: [this.color, 'grey'] }];
    }
  }

  navigate(link: string): void {
    this.router.navigate(['../' + link], { relativeTo: this.activatedRoute });
  }
}
