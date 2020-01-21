import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectInfoTooltipComponent } from './object-info-tooltip.component';

describe('ObjectInfoTooltipComponent', () => {
  let component: ObjectInfoTooltipComponent;
  let fixture: ComponentFixture<ObjectInfoTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectInfoTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectInfoTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
