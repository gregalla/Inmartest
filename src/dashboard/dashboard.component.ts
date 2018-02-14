import { Component ,OnInit } from '@angular/core';
import { UserService } from '../app/user.service';
import { Ages,Insurance,MOE,Gender} from '../app/types';

@Component({
  selector: 'dashboard-cmpt',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit{
	private _insuranceOption:string = '';
	private _moeOption:string = '';
	private _ageOption:string = 'Population';
	private _genderOption:string = '';
	private _keyValue :string = 'Population';
	private _genderValue :string = 'Population';
	private _insuranceTypes = [
		new Insurance('', 'Both' ),
		new Insurance('insured', 'Insured' ),
	    new Insurance('Uninsured', 'Uninsured' ),
	];

	private _ages = [
		new Ages('Population', 'All' ),
	    new Ages('Population - Under 18 years', '0-18' ),
	    new Ages('Population - 18 to 64 years', '18-64' ),
	    new Ages('Population - 19 to 25 years', '19-25' ),
	    new Ages('Population - 65 years and older', '65+')
	];

	private _moes = [
		new MOE('MOE', 'Yes' ),
	    new MOE('', 'No' )
	];

	private _genders = [
		new Insurance('', 'Both' ),
		new Insurance('Male', 'Male' ),
	    new Insurance('Female', 'Female' ),
	];

	private _agesData: any = [];
	private _genderData: any = [];
	private _incomeData: any = [];
	private _racesData:any = [];
	constructor(private userService: UserService) { }
	ngOnInit() {
      this.getData();
      this.getGenderData();
      this.getIncomeData();
      this.getRacesData();
  	}

  	getData() {
	    this.userService.getList().subscribe(data => {
            this._agesData = data;
        });
  	}

  	getGenderData(){
  		this.userService.getSexCategories().subscribe(data => {
            this._genderData = data;
        });
  	}

  	getIncomeData(){
  		this.userService.getIncomeCategories().subscribe(data => {
            this._incomeData = data;
        });
  	}

  	getRacesData(){
  		this.userService.getRaceCategories().subscribe(data => {
            this._racesData = data;
        });
  	}

  	fnPrepareAgeKeyValue(){
  		var string1:string = this._ageOption;
  		var string2:string = '';
  		if(this._insuranceOption){
  			string2 = ' - '+this._insuranceOption;
  		}
  		var string3:string = '';
  		if(this._moeOption){
  			string3 = ' '+this._moeOption;
  		}
  		this._keyValue = string1+string2+string3; 
  	}

  	fnPrepareGenderKeyValue(){
  		var string1:string = this._genderOption;
  		if(this._genderOption== ''){
  			string1 = 'Population';
  		}
  		var string2:string = '';
  		if(this._insuranceOption){
  			string2 = ' - '+this._insuranceOption;
  		}
  		var string3:string = '';
  		if(this._moeOption){
  			string3 = ' '+this._moeOption;
  		}
  		this._genderValue = string1+string2+string3; 
  	}

}
