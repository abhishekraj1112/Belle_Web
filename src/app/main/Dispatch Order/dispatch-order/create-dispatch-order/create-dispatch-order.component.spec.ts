import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDispatchOrderComponent } from './create-dispatch-order.component';

describe('CreateDispatchOrderComponent', () => {
  let component: CreateDispatchOrderComponent;
  let fixture: ComponentFixture<CreateDispatchOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDispatchOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDispatchOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
