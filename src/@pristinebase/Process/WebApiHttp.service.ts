import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalPostingHeader} from "./GlobalPostingHeader";

@Injectable({
  providedIn: 'root'
})
export class WebApiHttp implements OnInit{

  //public globalurl:string='https://localhost:5001';
  public globalurl:string='https://pristinefulfil.com'
  public ApiUrlArray:any={
    //todo user
    UserLoginAccess:'/api/User/UserLogin',

    //todo Location
    GetAllState:'/api/Location/GetAllState',
    GetAllDist:'/api/Location/GetAllDistrict/',
    GetDistDetail:'/api/Location/GetDistrictDetail',
    AddLocation:'/api/Location/InsertDistrictDetail',
    GetAreaDetail:'/api/Location/GetAreaDetail',
    GetAllArea:'/api/Location/GetAllArea/',
    GetAllStreet:'/api/Location/GetAllStreet/',
    GetStreetDetail:'/api/Location/GetAllStreetDetail',

    //todo AddSalesperson
    GetAllBranch:'/api/RsmSalesperson/GetAllBranch',
    AddSalesperson:'/api/RsmSalesperson/validate_file',
    GetSalepersonDetail:'/api/RsmSalesperson/GetSalespersondata/',
    DeleteSaleperson:'/api/RsmSalesperson/DeleteSaleperson',

    //todo Retailer
    GetSalesman:'/api/Retailer/GetSalesman/',
    GetRsm:'/api/Retailer/GetRsm',
    GetDistributors:'/api/Retailer/GetDistributors/',
    AddRetailer:'/api/Retailer/AddRetailer',
    GetAllBrand:'/api/Retailer/GetAllBrand',
    AddretailerbyExcel:'/api/Retailer/AddRetailerbyExcel',
    GetRetailerDetails:'/api/Retailer/GetRetailerDetails?branch=',

    //todo Distributors
    GetDistributorsDetails:'/api/RsmSalesperson/GetDistributorDetails',

    //todo AssignAreaBrandProduct
    AssignArea:'/api/AssignArea/AssignArea',
    AssignBrand:'/api/AssignArea/AssignBrand',
    GetBrand:'/api/AssignArea/GetBrand?emp_id=',
    GetStateRsm:'/api/AssignArea/GetStatetoRsm?emp_id=',
    AreaTosp:'/api/AssignArea/GetAreaTosalesman',
    retailerToSp:'/api/AssignArea/GetReatilaerToSp',
    GetAssignedState:'/api/AssignArea/GetAssignedState/',
    DeleteAssignedArea:'/api/AssignArea/DeleteAssignedArea',
    GetAssignedBrand:'/api/AssignArea/GetAssignedBrand/',
    DeleteAssignedBrand:'/api/AssignArea/DeleteAssignedBrands',
    AssignAreaToSp:'/api/AssignArea/AssignAreaToSp',
    GetAssignAreaToSp:'/api/AssignArea/GetAssignedAreaToSp/',
    GetRetailer:'/api/AssignArea/GetRetailer/',
    Assignretailer:'/api/AssignArea/Assignretailer',
    GetAssignRetailer:'/api/AssignArea/GetAssignedRetailer/',
    GetDistributorList:'/api/AssignArea/GetDistributor',
    GetAssignAreaToDistributor:'/api/AssignArea/GetAssignedAreaToDistributor/',
    GetAssignBrandToDistributor:'/api/AssignArea/GetAssignedBrandToDistributor/',
    DeleteAssignAreaToDist:'/api/AssignArea/DeleteAssignedAreaTodistributor',
    DeleteAssignRetailer:'/api/AssignArea/DeleteAssignedRetailer',

    //Todo assign Day/Market
    AddDayMarket:'/api/RsmSalesperson/AddMarket',
    AssignDayMarket:'/api/RsmSalesperson/AssignMarketToSp',
    GetDayMarketList:'/api/RsmSalesperson/GetDayMarketList',
    GetArea:'/api/AssignArea/GetAreaTosp/',
    GetAssignedDayMarket:'/api/RsmSalesperson/AssignedDayMarketList?sp_id=',
    DeleteDayMarket:'/api/RsmSalesperson/DeleteDaYMarket',
    DeleteAssignedMarket:'/api/RsmSalesperson/Deleteassignedmarket',

    //Todo Order
    GerOrderHeader:'/api/Order/GetOrderHeaderDetail',
    GetOrderimage:'/api/Order/GetOrderimage?order_no=',
    GetDistributor:'/api/Order/GetOrderDistributor?salesman=',
    GetItemGroup:'/api/Order/GetBrandItemgroup?brand_id=',
    GetItemColor:'/api/Order/GetBrandColor?itemgroup=',
    createOrder:'/api/Order/createOrder',
    GetOrderLine:'/api/Order/GetOrderLine?order_no=',
    DeleteOrderLine:'/api/Order/DeleteOrderLine',
    GetArticle:'/api/Order/GetArticle',
    GetRetailerBranchWise:'/api/Order/GetretailerBranchWise?branch=',
    GeTDistributorBranchWise:'/api/Order/GetDistributorBranchWise?branch=',
    GetOrderDetailBranchWise:'/api/Order/GetOrderDetailBranchwise?branch=' ,
    DeleteSaleOrder:'/api/Order/deleteSaleOrder',

    //Todo UserSetup
    GetSalesperson:'/api/UserSetup/GetSalesperson',
    GetDistList:'/api/UserSetup/GetDistributor?branch=',
    Createuserpassword:'/api/UserSetup/CreateUserPassword',
    GetUserList:'/api/UserSetup/GetUserList?role=',
    DeleteUser:'/api/UserSetup/DeleteUser',
    GetUserRole:'/api/UserSetup/GetUserRole',
    ChangeUserPassword:'/api/UserSetup/ChangeUserPassword',

    //Todo Dispatch Order
    GetOrderDetail:'/api/DispatchOrder/GetOrderDetail?dist_id=',
    CreateDispatchOrder:'/api/DispatchOrder/createDispatchOrder',
    ShowDispatchedOrder:'/api/DispatchOrder/showDispatchOrderDetail?dist_id=',
    ShowDispatchedOrderline:'/api/DispatchOrder/showDispatchOrderLine?order_no=',
    GetBoxId:'/api/DispatchOrder/GetBoxid',
    ShowItemDetail:'/api/DispatchOrder/showItemDetails?barcode=',
    ScanItem:'/api/DispatchOrder/ScanItem',
    GetPackingSlipreportData:'/api/DispatchOrder/GetPackingslipData',
    ShowDispatchLineToScan:'/api/DispatchOrder/showDispatchOrderLineToScan?order_no=',
    ShowScanneditem:'/api/DispatchOrder/showScanneditem?order_no=',
    AddToOrderForDispatch:'/api/DispatchOrder/AddToOrderForDispatchOrder',
    CompleteScanProcess:'/api/DispatchOrder/CompleteScanProcess',
    GetPickListReport:'/api/DispatchOrder/GetPickListData?order_no=',
    GetBoxIDtoprintreport:'/api/DispatchOrder/GetboxIdtoReport?order_no=',
    GetOrderItemdetail:'/api/DispatchOrder/OrderItemDetails?order_no=',
    GetScanCompltedHeader:'/api/DispatchOrder/showScanCompletedHeader',
    GetScanCompletedLine:'/api/DispatchOrder/showScanCompletedLine?order_no=',
    GetDistributorlistBranchWise:'/api/DispatchOrder/distributorlistBranchWise?branch=',
    ApproveDispatchOrder:'/api/DispatchOrder/ApproveDispatchOrder',
    ShowTotalScannedItem:'/api/DispatchOrder/showTotalScanneditem?order_no=',
    // todo arjun
    GetAllBrandMaster:'/api/OrderCreation/GetAllBrandMaster',
    InsertItemImage:'/api/OrderCreation/InsertItemImage',
  }

  constructor(private httpClient:HttpClient,private globalPostingHeader:GlobalPostingHeader) { }

  ngOnInit(): void {
  }


  async PostDataToServer(path:string,json:any):Promise<any>{
    try{
      path=this.globalurl+path;
      var header=this.globalPostingHeader.getHTTPHeader;
      return  await new Promise<any>((resolve,reject) => {
        this.httpClient.post<any>(path,JSON.stringify(json),header).toPromise()
            .then(result=>resolve(result),error=>reject({
              condition:'false',
              message:error.message
            })).catch(error=>reject({ condition:'false',
            message:error.message}))
      })
    }catch (e) {
      return new Promise<any>((resolve) => {
        resolve({condition:'false',message:e.message})
      })
    }
  }

  //todo For formdata
  async Post(path:string,formdata:any):Promise<any>{
    try{
      path=this.globalurl+path;
      var header=this.globalPostingHeader.getHTTPHeader;
      return  await new Promise<any>((resolve,reject) => {
        this.httpClient.post<any>(path,formdata).toPromise()
            .then(result=>resolve(result),error=>reject({
              condition:'false',
              message:error.message
            })).catch(error=>reject({ condition:'false',
          message:error.message}))
      })

    }catch (e) {
      return new Promise<any>((resolve) => {
        resolve({condition:'false',message:e.message})
      })
    }
  }

  async GetDataFromServer(path:string):Promise<any>{
    try {
      path=this.globalurl+path;
      var header=this.globalPostingHeader.getHTTPHeader;
      return await new Promise<any>((resolve, reject) =>{
        this.httpClient.get(path,header).toPromise()
            .then(result=>resolve(result),error=>reject({
              condition:'false',
              message:error.message
            })).catch(error=>reject({condition:'false',message:error.message}))
      })
    }catch (e) {
      return  new Promise<any>((resolve) =>{
        resolve({
          condition:'false',
          message:e.message
        })
      })
    }
  }
}
