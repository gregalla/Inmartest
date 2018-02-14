import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'bar-chart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
	@ViewChild('chart') private chartContainer: ElementRef;

	@Input() data: Array<any>;
	@Input() val: string;
	private margin: any = { top: 20, bottom: 100, left: 100, right: 20};
  	private chart: any;
  	private width: number;
  	private height: number;
  	private xScale: any;
  	private yScale: any;
  	private colors: any;
  	private xAxis: any;
  	private yAxis: any;
	constructor() { }

	ngOnInit() {
	    this.createChart();
	    if (this.data) {
	      this.updateChart();
	    }
	}
    ngOnChanges() {
	    if (this.chart) {
	      this.updateChart();
	    }
  	}
  	createChart() {
	    let element = this.chartContainer.nativeElement;
	    this.width = element.offsetWidth - this.margin.left - this.margin.right;
	    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
	    let svg = d3.select(element).append('svg')
	      .attr('width', element.offsetWidth)
	      .attr('height', element.offsetHeight);

	    // chart plot area
	    this.chart = svg.append('g')
	      .attr('class', 'bars')
	      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

	    // define X & Y domains
	    let xDomain = this.data.map(d => d.County);
	    let yDomain = [0, d3.max(this.data, d => d[this.val])];

	    // create scales
	    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
	    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

	    // bar colors
	    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

	    // x & y axis
	    this.xAxis = svg.append('g')
	      .attr('class', 'axis axis-x')
	      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
	      .call(d3.axisBottom(this.xScale))
	      .selectAll("text")	
        .style("fill", "#000")
        .attr("dx", "-3em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
	    this.yAxis = svg.append('g')
	      .attr('class', 'axis axis-y')
	      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
	      .call(d3.axisLeft(this.yScale));
  	}
	updateChart() {
	    // update scales & axis
	    this.xScale.domain(this.data.map(d => d.County));
	    this.yScale.domain([0, d3.max(this.data, d => d[this.val])]);
	    this.colors.domain([0, this.data.length]);
	    this.xAxis.transition().call(d3.axisBottom(this.xScale));
	    this.yAxis.transition().call(d3.axisLeft(this.yScale));

	    let update = this.chart.selectAll('.bar')
	      .data(this.data);

	    // remove exiting bars
	    update.exit().remove();

	    // update existing bars
	    this.chart.selectAll('.bar').transition()
	      .attr('x', d => this.xScale(d.County))
	      .attr('y', d => this.yScale(d[this.val]))
	      .attr('width', d => this.xScale.bandwidth())
	      .attr('height', d => this.height - this.yScale(d[this.val]))
	      .style('fill', (d, i) => this.colors(i));

	    // add new bars
	    update
	      .enter()
	      .append('rect')
	      .attr('class', 'bar')
	      .attr('x', d => this.xScale(d.County))
	      .attr('y', d => this.yScale(0))
	      .attr('width', this.xScale.bandwidth())
	      .attr('height', 0)
	      .style('fill', (d, i) => this.colors(i))
	      .transition()
	      .delay((d, i) => i * 10)
	      .attr('y', d => this.yScale(d[this.val]))
	      .attr('height', d => this.height - this.yScale(d[this.val]));
	  }
}
