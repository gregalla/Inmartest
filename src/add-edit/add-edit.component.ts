import { Component, OnInit } from '@angular/core';
import { UserService } from '../app/user.service';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
  providers: [UserService]
})
export class AddEditComponent implements OnInit {
	private _insuranceData: any;
  constructor(private userService:UserService, private router:Router) { }

  	ngOnInit() {
  		this.getInsuranceData();
  	}
  	getInsuranceData() {
	    this.userService.getList().subscribe(data => {
            this._insuranceData = data;
        });
  	}
  	editContent(item:any){debugger;
  		if(item == 'new'){
  			this.router.navigate(['editCountry/new']);
  		}
  		else
  		this.router.navigate(['editCountry/'+item.County]);
  	}
}
