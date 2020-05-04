import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AssignAreaProductBrandComponent} from "./assign-area-product-brand.component";

describe('AddLocationComponent', () => {
  let component: AssignAreaProductBrandComponent;
  let fixture: ComponentFixture<AssignAreaProductBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignAreaProductBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAreaProductBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
