import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { UserService } from '../app/user.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
  providers: [UserService]
})
export class HeatmapComponent implements OnInit {
	@ViewChild('treemap') private chartContainer: ElementRef;

	
	@Input() val: string;
	private margin: any = { top: 20, bottom: 100, left: 100, right: 20};
	private data: any;
  	private chart: any;
  	private width: number;
  	private height: number;
  	private xScale: any;
  	private yScale: any;
  	private colors: any;
  	private xAxis: any;
  	private yAxis: any;
	constructor(private userService:UserService) { }

	ngOnInit() {
		this.getData();
	}
	getData() {
	    this.userService.getTreeList().subscribe(data => {
            this.data = data;
            this.createchart();
        });
  	}
	createchart() {
		/*let element = this.chartContainer.nativeElement;
	    this.width = element.offsetWidth - this.margin.left - this.margin.right;
	    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

	    let svg = d3.select(element).append('svg')
	      .attr('width', element.offsetWidth)
	      .attr('height', element.offsetHeight);

		let fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
		    color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
		    format = d3.format(",d");

		let treemap = d3.treemap()
		    .tile(d3.treemapResquarify)
		    .size([this.width, this.height])
		    .round(true)
		    .paddingInner(1);

	//d3.json("./population.json", function(error, data) {
		  //if (error) throw error;
		  //console.log(data);
		  let root = d3.hierarchy(this.data)
		      .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
		      .sum(sumBySize)
		      .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

		  treemap(root);

		  let cell = svg.selectAll("g")
		    .data(root.leaves())
		    .enter().append("g")
		      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

		  cell.append("rect")
		      .attr("id", function(d) { return d.data.id; })
		      .attr("width", function(d) { return d.x1 - d.x0; })
		      .attr("height", function(d) { return d.y1 - d.y0; })
		      .attr("fill", function(d) { return color(d.parent.data.id); });

		  cell.append("clipPath")
		      .attr("id", function(d) { return "clip-" + d.data.id; })
		    .append("use")
		      .attr("xlink:href", function(d) { return "#" + d.data.id; });

		  cell.append("text")
		      .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
		    .selectAll("tspan")
		      .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
		    .enter().append("tspan")
		      .attr("x", 4)
		      .attr("y", function(d, i) { return 13 + i * 10; })
		      .text(function(d) { return d; });

		  cell.append("title")
		      .text(function(d) { return d.data.id + "\n" + format(d.value); });*/

		//});
		function sumBySize(d) {
			return d.size;
		}
	}
}
