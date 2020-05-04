import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AddRsmSalespersonComponent} from "./add-rsm-salesperson.component";

describe('AddLocationComponent', () => {
  let component: AddRsmSalespersonComponent;
  let fixture: ComponentFixture<AddRsmSalespersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRsmSalespersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRsmSalespersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
