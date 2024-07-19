import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UnitLocation } from '@models/unit';

import { UnitState } from '@states/unit.state';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  private nnfb = new FormBuilder().nonNullable;
  private unitState = inject(UnitState);

  protected formGroup = this.nnfb.group({
    hour: ['', Validators.required],
    showClosed: [false, Validators.required],
  });
  
  protected units$: Observable<UnitLocation[]> = this.unitState.units$;

  units = toSignal(this.units$, { initialValue: [] });

  onSubmit = () => {
    this.unitState.loadAllUnits(this.formGroup.value.showClosed);
  };

  onClean = () => {
    this.formGroup.reset();
    this.unitState.clean();
  };
}
