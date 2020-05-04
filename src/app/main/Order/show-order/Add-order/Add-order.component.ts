import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {AddOrderService} from "./Add-order.service";
import {
    AllArea,
    AllDist,
    AreaDetail,
    brandmodel,
    DistModel,
    Statemodel,
    streetDetail
} from "../../../../Model/LocationModel";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {PristineToaster} from "../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {
    articleModel,
    distributorModel,
    GetOrderheader, getorderline,
    ImageModel,
    Itemcolor,
    itemgroupModel
} from "../../../../Model/OrderModel";
import {ShowOrderService} from "../show-order.service";
import {getMatFormFieldDuplicatedHintError} from "@angular/material/form-field";
import {EncriptDecript} from "../../../../../@pristinebase/Process/EncriptDecript";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgxSpinnerService} from "ngx-spinner";
import {PristineConfirmDialogComponent} from "../../../../../@pristinebase/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
    selector: 'app-show-order',
    templateUrl: './Add-order.component.html',
    styleUrls: ['./Add-order.component.scss'],
    animations: [
        // Each unique animation requires its own trigger. The first argument of the trigger function is the name
        trigger('rotatedState', [
            state('default', style({transform: 'rotate(0)'})),
            state('rotated1', style({transform: 'rotate(90deg)'})),
            state('rotated2', style({transform: 'rotate(180deg)'})),
            state('rotated3', style({transform: 'rotate(270deg)'})),
            transition('rotated => default', animate('400ms ease-out')),
            transition('default => rotated', animate('400ms ease-in'))
        ])
    ]
})
export class AddOrderComponent implements OnInit {
    dataSource;dataSource1;datasourceview
    itemGroup:FormControl=new  FormControl()
    brnd: string;
    color;size;cup_size;data
    qtyValue: Array<{value:number}> = [];
    imageValue = 'none';
    articleList: Array<articleModel> = []
    TotalQty: number = 0;
    public loading = false;
    Qty: FormControl = new FormControl()
    distribtr: FormControl = new FormControl();
    OrderheaderDetails: Array<GetOrderheader>
    distributor: Array<distributorModel>
    Allbrand: Array<brandmodel>
    AllItemGrouop: Array<itemgroupModel> = []
    AllItemColor: Array<Itemcolor> = []
    DataTableDetail: any
    image: Array<any> = []
    searchItemGroup:string=''
    displayedColumns1: string[] = ["article", "qty"]
    temdata: Array<articleModel> = []
    OrderLine:Array<getorderline>=[]
    type:string;
    tempOrderData: Array<{ brand: string, art_no: string, item_group: string, color: string, size: string, cup_size: string, qty: number }> = []
    displayedColumns: string[] = ["article", "qty", "action"];
    viewdisplayedColumns:string[]=["art_no","brand","color","size","qty","action"];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;


    constructor(
        public WebApiHttp: WebApiHttp, private route: ActivatedRoute,private configRef:MatDialog,
        public _locationService: AddOrderService, public  _encryptdecrypt: EncriptDecript,
        public _toasterService: PristineToaster, private router: Router,private spinner: NgxSpinnerService)
    {
        this.dataSource = new MatTableDataSource<GetOrderheader>(this.OrderheaderDetails)
        this.Allbrand = this._locationService.Allbrand;
        this.DataTableDetail = JSON.parse(this._encryptdecrypt.decrypt(this.route.snapshot.paramMap.get('response')));
        this.type=(this.route.snapshot.paramMap.get('type'))
        this._locationService.GetOrderDistributor(this.DataTableDetail.retailer_id)
            .then(result => {
                this.distributor = result as distributorModel[]
                this.distribtr.setValue(this.distributor[0].distributor)
            },err=>{this._toasterService.onError('error',err)})

        for (let i = 0; i <= 225; i++) {
            this.qtyValue.push({value:i})
        }

    }
    state: string = 'default';

    rotate() {
        if (this.state === 'default') {
            this.state = 'rotated1'
        } else if (this.state === 'rotated1') {
            this.state = 'rotated2'
        } else if (this.state === 'rotated2') {
            this.state = 'rotated3'
        } else if (this.state === 'rotated3') {
            this.state = 'default'
        }
    }

    ngOnInit() {

        if (this.DataTableDetail!=null && this.DataTableDetail!=undefined) {
            try {
                this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetOrderimage + this.DataTableDetail.order_no)
                    .then(result => {
                        this.image = result as ImageModel[];
                    }, err => {
                        this._toasterService.onError('error',err)
                    })
            } catch (e) {
                this._toasterService.onError('error',e)
            }
        }
        if(this.type=='view'){
            try{
                this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetOrderLine+this.DataTableDetail.order_no)
                    .then(result=>{
                        if(result[0].condition.toLowerCase()=='true'){
                            this.OrderLine=result as getorderline[];
                            this.datasourceview=new MatTableDataSource<getorderline>(this.OrderLine);
                            this.datasourceview.paginator=this.paginator;
                            this.datasourceview.sort=this.sort;
                        }else{
                            this._toasterService.onError('error','Data Not Found')
                        }
                    },error=>{
                        this._toasterService.onError('error',error)
                    })
            }catch (e) {
                this._toasterService.onError('error',e)
            }
        }
    }

    getArticle(itemGroup: string, color: string) {
        try {
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetArticle + "?itemgroup=" + itemGroup + "&" + "color=" + color)
                .then(result => {
                    if (result[0].condition.toLowerCase() == 'true') {
                        this.articleList = result as articleModel[];
                        this.dataSource1 = new MatTableDataSource(this.articleList)
                    }
                }, err => {
                    this._toasterService.onError('error',err)
                })
        } catch (e) {
            this._toasterService.onError('error',e)
        }
    }

    OnClickAdd() {
        for (let i = 0; i < this.dataSource1.data.length; i++) {
            if (this.dataSource1.data[i].qty > 0) {
                var verify: boolean = false
                var indexOfDatasource1: number = 0;
                var tempdataIndex: number = 0
                for (let j = 0; j < this.temdata.length; j++) {
                    if (this.dataSource1.data[i].article == this.temdata[j].article) {
                        verify = true;
                        tempdataIndex = j;
                        indexOfDatasource1 = i;
                        break;
                    }
                }
                if (verify) {
                    this.temdata[tempdataIndex].qty += this.dataSource1.data[indexOfDatasource1].qty;
                } else {
                    this.temdata.push(this.dataSource1.data[i]);
                }
            }
        }
        this.dataSource1 = [];
        this.dataSource = new MatTableDataSource(this.temdata)
        this.TotalQty = 0
        for (let i = 0; i < this.dataSource.data.length; i++) {
            this.TotalQty = this.TotalQty + this.dataSource.data[i].qty
        }

      this.brnd='';this.itemGroup.setValue('');this.color=''

    }

    onDeleteRow(data: any, index: number) {
        this.TotalQty = 0
        this.dataSource.data.splice(index, 1)
        this.dataSource = new MatTableDataSource(this.dataSource.data)
        for (let i = 0; i < this.dataSource.data.length; i++) {
            this.TotalQty = this.TotalQty + this.dataSource.data[i].qty
        }


    }

    getItemGroup(brand_id: string) {
        try {
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetItemGroup + brand_id)
                .then(result => {
                    if (result[0].condition.toLowerCase() == 'true') {
                        this.AllItemGrouop = result as itemgroupModel[];
                    }
                }, err => {
                    this._toasterService.onError('error',err)
                })
        } catch (e) {
            this._toasterService.onError('error',e)
        }
    }

    getItemColor(itemGroup: string) {
        try {
            this.WebApiHttp.GetDataFromServer(this.WebApiHttp.ApiUrlArray.GetItemColor + itemGroup)
                .then(result => {
                    if (result[0].condition.toLowerCase() == 'true') {
                        this.AllItemColor = result as Itemcolor[];
                    }
                }, err => {
                    this._toasterService.onError('error',err)
                })
        } catch (e) {
            this._toasterService.onError('error',e)
        }
    }

    createOrder() {
        this.spinner.show();
        if (!(this.dataSource.data.length > 0)) {
            this._toasterService.onError('error', 'Please add min one line to create final order')
        } else {
            const json = {
                order_no: this.DataTableDetail.order_no,
                distributor: this.distribtr.value,
                created_by: this._encryptdecrypt.decrypt(localStorage.getItem('Belle_SSID')),
                order: this.temdata
            }
            try {
                this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.createOrder, json)
                    .then(result => {
                        let response: Array<{ condition: string, messgae: string }> = result
                        if (response[0].condition.toLowerCase() == 'true') {
                            this._toasterService.onSuccess('success', response[0].messgae)
                            this.router.navigate(['/order/show-order'])
                            this.tempOrderData = [];
                            this.brnd = '', this.distribtr.setValue(''), this.itemGroup.setValue(''), this.color = '', this.size = '', this.cup_size = '', this.Qty.setValue('')
                            this.spinner.hide();
                        } else {
                            this._toasterService.onError('error', response[0].messgae);
                            this.spinner.hide();
                        }
                    }, err => {
                        this._toasterService.onError('error',err);
                        this.spinner.hide();
                    })
            } catch (e) {
                this._toasterService.onError('error',e);
                this.spinner.hide();
            }
        }
    }

    deleteOrderLine(rowData:any){
        var dialog=this.configRef.open(PristineConfirmDialogComponent)
        dialog.componentInstance.title='Info';
        dialog.componentInstance.confirmMessage='Are you sure!you want to delete line';
        dialog.afterClosed().subscribe(result=>{
            if(result==true){
                try{
                    this.WebApiHttp.PostDataToServer(this.WebApiHttp.ApiUrlArray.DeleteOrderLine,{id:rowData.id})
                        .then(result=>{
                            if(result[0].condition.toLowerCase()=='true'){
                                this._toasterService.onSuccess('success','Line deleted')
                                this.ngOnInit()
                            }else{
                                this._toasterService.onError('error',result[0].message)
                            }
                        })
                }catch (e) {

                }
            }
        })

    }
}
