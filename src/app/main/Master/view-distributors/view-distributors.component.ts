import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {ViewDistributorsService} from "./view-distributors.service";
import {AllArea, AllDist, AreaDetail, DistModel, Statemodel, streetDetail} from "../../../Model/LocationModel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {distributorsDetailsModel} from "../../../Model/DistributorsModel";


@Component({
  selector: 'view-distributors-location',
  templateUrl: './view-distributors.component.html',
  styleUrls: ['./view-distributors.component.scss']
})
export class ViewDistributorsComponent implements OnInit {
    dataSource;
    DistList:Array<distributorsDetailsModel>
    displayColumn:Array<string>=["firm_name","name","mobile","address","branch"]
    @ViewChild('Paginator', {static: true}) paginator: MatPaginator;
    @ViewChild('Sort', {static: true}) sort: MatSort;


    constructor(
        public WebApiHttp: WebApiHttp,
        public _locationService: ViewDistributorsService,
        public _toasterService: PristineToaster) {
        this.dataSource = new MatTableDataSource<Statemodel>()
        this.DistList=_locationService.DistList;
    }




  ngOnInit() {

this.dataSource=new  MatTableDataSource(this.DistList)
      this.dataSource.paginator=this.paginator;
this.dataSource.sort=this.sort;
  }
    applyFilter(filterValue: string, keyName: string)
    {
        this.dataSource.filter = filterValue;
        this.dataSource.filterPredicate = function (data, filter: string): boolean {
            if (data[keyName] != undefined && data[keyName] != null && data[keyName] != '') {
                return (data[keyName] != null && data[keyName] != undefined ? data[keyName].toString().toLowerCase() : '').includes(filter.toLowerCase());
            } else {
                return false
            }

        };
    }



}
