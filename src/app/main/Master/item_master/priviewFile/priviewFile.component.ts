import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ItemMasterResponse} from "../item_master.component";
import {WebApiHttp} from "../../../../../@pristinebase/Process/WebApiHttp.service";
import {PristineToaster} from "../../../../../@pristinebase/Process/ToasterService/PristineToaster";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'cdk-priviewFile',
    templateUrl: './priviewFile.component.html',
    styleUrls: ['./priviewFile.component.scss']
})
export class PriviewFileComponent implements OnInit {
    selectedimageData: ItemMasterResponse;

    constructor(private dialogRef: MatDialogRef<PriviewFileComponent>,
                private spinner: NgxSpinnerService,
                public  pristineToaster: PristineToaster,
                @Inject(MAT_DIALOG_DATA) public data: PassData,
                public  webApiHttp: WebApiHttp) {
        this.selectedimageData = JSON.parse(data.datamodel);
        this.selectedimageData.selectedImage = this.selectedimageData.main_image;
    }

    src;

    ngOnInit() {

    }


    send() {
        this.dialogRef.close();
    }

    incomingfile(event) {
        if (event.target.files.length > 0 && event.target.files.length == 4) {
            var mimeType = event.target.files[0].type;
            if (mimeType.match(/image\/*/) == null) {
                this.pristineToaster.onError("Error", "Please Select Image File");
                this.files = [];
            } else {
                this.files = event.target.files;
                this.selectedimageData.main_image
                var reader = new FileReader();
                reader.readAsDataURL(this.files[0]);
                reader.onload = (_event) => {
                    this.selectedimageData.selectedImage = reader.result;
                    this.selectedimageData.main_image = reader.result;
                }
                var reader1 = new FileReader();
                reader1.readAsDataURL(this.files[1]);
                reader1.onload = (_event) => {
                    this.selectedimageData.image_1 = reader1.result;
                }
                var reader2 = new FileReader();
                reader2.readAsDataURL(this.files[2]);
                reader2.onload = (_event) => {
                    this.selectedimageData.image_2 = reader2.result;
                }
                var reader3 = new FileReader();
                reader3.readAsDataURL(this.files[3]);
                reader3.onload = (_event) => {
                    this.selectedimageData.image_3 = reader3.result;
                }
            }
        } else {
            this.pristineToaster.onError("Error", "Please Select Minimum 4 Images.");
            this.files = [];
        }
    }

    files:  File[] = [];
    selected_mainIndex = 0;

    uplod_Submit() {
        this.spinner.show();
        let formData = new FormData();
        Array.from(this.files).forEach(f => {
            formData.append('files', f);
        });
        formData.append('article_Id',this.selectedimageData.articleId);
        formData.append('main_image_index',this.selected_mainIndex.toString());
        this.webApiHttp.Post(this.webApiHttp.ApiUrlArray.InsertItemImage, formData).then((result:Array<ImageUploadData>) => {
            this.spinner.hide();
            if(result.length>0 && result[0].condition=='True'){
              this.dialogRef.close();
          }
        },ee=>{  this.spinner.hide();}).catch(ee=>{  this.spinner.hide();});
    }
}

interface PassData {
    Title: string;
    datamodel: string;
}
export class ImageUploadData {
    condition: string
    message: string
}

