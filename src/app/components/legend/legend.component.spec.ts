import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendComponent } from './legend.component';

describe('LegendComponent', () => {
  let component: LegendComponent;
  let fixture: ComponentFixture<LegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should legends initial values', () => {
    expect(Object.keys(component['legends']).length).toEqual(4);
    expect(Object.values(component['legends']).length).toEqual(4);
    expect(component['legends'][0].group).toEqual('mask')
    expect(component['legends'][1].group).toEqual('towel')
    expect(component['legends'][2].group).toEqual('fountain')
    expect(component['legends'][3].group).toEqual('lockerroom')
  })
});
