import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRejDispatchOrderComponent } from './app-rej-dispatch-order.component';

describe('AppRejDispatchOrderComponent', () => {
  let component: AppRejDispatchOrderComponent;
  let fixture: ComponentFixture<AppRejDispatchOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRejDispatchOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRejDispatchOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
