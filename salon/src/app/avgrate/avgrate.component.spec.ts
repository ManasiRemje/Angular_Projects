import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgrateComponent } from './avgrate.component';

describe('AvgrateComponent', () => {
  let component: AvgrateComponent;
  let fixture: ComponentFixture<AvgrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgrateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
