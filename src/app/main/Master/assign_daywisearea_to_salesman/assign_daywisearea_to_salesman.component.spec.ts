import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {Assign_daywisearea_to_salesmanComponent} from "./assign_daywisearea_to_salesman.component";

describe('AddLocationComponent', () => {
  let component: Assign_daywisearea_to_salesmanComponent;
  let fixture: ComponentFixture<Assign_daywisearea_to_salesmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Assign_daywisearea_to_salesmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Assign_daywisearea_to_salesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
