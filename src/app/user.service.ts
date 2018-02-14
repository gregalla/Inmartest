import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/filter';
 
 

 
@Injectable()
export class UserService {
 
  
  private _chartData : any = [];
  constructor(
    private http: HttpClient) { 
      
  }
 
  /** GET list from the json */
  getList (): Observable<any> {
    return this.http.get("../assets/data/Uninsured_Population.json");
  }
  
  getTreeList(): Observable<any> {
    return this.http.get("../assets/data/population.json");
  }
  getCounty(id){
    return this.getList().filter(x => x.County == id);
  }

  getAgesList() {
    return this.getList();
  }

  getSexCategories(){
    return this.getList();
  }

  getIncomeCategories(){
    return this.getList();
  }

  getRaceCategories(){
    return this.getList();
  }

  getTreeData(){
    return this.getTreeList();
  }

}