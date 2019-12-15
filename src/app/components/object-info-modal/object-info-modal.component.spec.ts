import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectInfoModalComponent } from './object-info-modal.component';

describe('ObjectInfoComponent', () => {
  let component: ObjectInfoModalComponent;
  let fixture: ComponentFixture<ObjectInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
