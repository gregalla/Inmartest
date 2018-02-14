import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { UserService } from '../app/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css']
})
export class EditCountryComponent implements OnInit {
	countyName: string;
	countiesData: any;
	countyData : any ;
	constructor(private route: ActivatedRoute,
  private router: Router,private userService: UserService) { 
    	console.log(this.countyName + "test");
  	}

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('name');
		this.userService.getList().subscribe((data) => {
			let list = data;
            list.forEach((obj)=>{
            	if (obj.County == id){
        		 	this.countyData = obj;
            	}
            })
		});
	}

}
