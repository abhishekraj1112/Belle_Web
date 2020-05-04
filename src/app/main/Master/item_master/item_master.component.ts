import {Component, OnInit, ViewChild} from '@angular/core';
import {WebApiHttp} from "../../../../@pristinebase/Process/WebApiHttp.service";
import {Item_masterService} from "./item_master.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {MatDialog} from "@angular/material/dialog";
import {PriviewFileComponent} from "./priviewFile/priviewFile.component";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
    selector: 'item_master',
    templateUrl: './item_master.component.html',
    styleUrls: ['./item_master.component.scss']
})
export class Item_masterComponent implements OnInit {
    dataSource;
    itemMasterList: Array<ItemMasterResponse>
    displayColumn: Array<string> = ["Image", "articleId", "brand_id", "total_inventory", "open_inventory", "item_group", "color", "size", "cup_size", "Action"]
    @ViewChild('Sort', {static: true}) sort: MatSort;


    constructor(
        private spinner: NgxSpinnerService,
        public composeDialog: MatDialog,
        public WebApiHttp: WebApiHttp,
        public itemMasterService: Item_masterService,
        public _toasterService: PristineToaster) {
        this.dataSource = new MatTableDataSource<ItemMasterResponse>();
    }


    ngOnInit() {
        this.spinner.show();
        this.getDataFromServer('');
    }

    filter_dynamic: Array<{ filterKey: string, filter_value: string }> = [];

    applyFilter(filterValue: string, keyName: string) {
        if(keyName!='') {
            let validate: boolean = false;
            Array.from(this.filter_dynamic).forEach(item => {
                if (item.filterKey == keyName) {
                    item.filter_value = filterValue;
                    validate = true;
                }
            });
            if (!validate) {
                this.filter_dynamic.push({filterKey: keyName, filter_value: filterValue});
            }
        }

        let query = '';
        for (let i = 0; i < this.filter_dynamic.length; i++) {
            if (i == 0)
                query = 'WHERE ' + this.filter_dynamic[i].filterKey + " like '%" + this.filter_dynamic[i].filter_value + "%'" + (i == this.filter_dynamic.length - 1 ? '' : ' AND ')
            else
                query += ' ' + this.filter_dynamic[i].filterKey + " like '%" + this.filter_dynamic[i].filter_value + "%'" + (i == this.filter_dynamic.length - 1 ? '' : ' AND ')
        }
        this.getDataFromServer(query);
    }

    length = 0;
    RowsPerPage = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    PageNumber = 0;

    myPagginaterEvent(event) {
        this.spinner.show();
        this.RowsPerPage = event.pageSize;
        this.PageNumber = event.pageIndex;
        this.applyFilter('','');
    }

    priviewFile(selectedImage: ItemMasterResponse) {
        const dialogRef = this.composeDialog.open(PriviewFileComponent, {
            width: '800px',
            data: {Title: "Image preview", datamodel: JSON.stringify(selectedImage)},
        });
        dialogRef.afterClosed().subscribe(value => {
            this.ngOnInit();
        })
    }

    getDataFromServer(qery_parameter: string) {
        var json = {
            RowsPerPage: this.RowsPerPage,
            PageNumber: this.PageNumber,
            qery_parameter: qery_parameter
        }
        console.log(json);
        this.itemMasterService.GetAllItemMaster(json).then(result => {
            this.spinner.hide();
            if (result.length > 0 && result[0].condition == "True") {
                this.itemMasterList = result;
                this.length = this.itemMasterList[0].total_rows;
                this.dataSource = new MatTableDataSource(this.itemMasterList)
                this.dataSource.sort = this.sort;
            } else {
                this.itemMasterList = [];
                this.length = 0;
                this.dataSource = new MatTableDataSource(this.itemMasterList)
                this.dataSource.sort = this.sort;
            }
        }, err => {
            this.spinner.hide();
        }).catch(ee => {
            this.spinner.hide();
        });
    }
}

export class ItemMasterResponse {
    condition: string;
    id: string;
    articleId: string;
    brand_id: string;
    brand: string;
    item_group: string;
    color: string;
    size: string;
    cup_size: string;
    created_on: string;
    mrp: string;
    category: string;
    total_inventory: string;
    open_inventory: string;
    main_image: any;
    image_1: any;
    image_2: any;
    image_3: any;
    selectedImage: any;
    total_rows: number;
}
