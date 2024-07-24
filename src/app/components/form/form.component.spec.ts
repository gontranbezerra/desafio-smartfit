import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitState } from '@states/unit.state';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let unitState: UnitState;
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent],
      providers: [HttpClient, HttpHandler],
    }).compileComponents();

    unitState = TestBed.inject(UnitState);
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
