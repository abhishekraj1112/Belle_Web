import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { pristineAnimations } from '@pristinebase/animations';


@Component({
    selector     : 'analytics-dashboard',
    templateUrl  : './userdashboard.component.html',
    styleUrls    : ['./userdashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : pristineAnimations
})
export class userdashboardComponent implements OnInit
{

    constructor(

    )
    {

    }


    ngOnInit(): void
    {

    }


}

