import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {Assign_usernameComponent} from "./assign_username.component";

describe('AddLocationComponent', () => {
  let component: Assign_usernameComponent;
  let fixture: ComponentFixture<Assign_usernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Assign_usernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Assign_usernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
