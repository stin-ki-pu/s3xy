import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PutObjectModalComponent } from './put-object-modal.component';

describe('PutObjectModalComponent', () => {
  let component: PutObjectModalComponent;
  let fixture: ComponentFixture<PutObjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PutObjectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PutObjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
