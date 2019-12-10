import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBucketModalComponent } from './delete-bucket-modal.component';

describe('DeleteBucketModalComponent', () => {
  let component: DeleteBucketModalComponent;
  let fixture: ComponentFixture<DeleteBucketModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBucketModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBucketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
