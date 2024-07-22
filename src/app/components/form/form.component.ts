import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { HOUR_INDEX, UnitLocation } from '@models/unit';

import { UnitState } from '@states/unit.state';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  private nnfb = new FormBuilder().nonNullable;
  private unitState = inject(UnitState);

  protected formGroup = this.nnfb.group({
    hour: [<HOUR_INDEX>'morning', Validators.required],
    showClosed: [false, Validators.required],
  });

  protected units$: Observable<UnitLocation[]> = this.unitState.units$;

  protected units = toSignal(this.units$, { initialValue: [] });

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit = () => {
    this.unitState.load(this.formGroup.value);
  };

  onClean = () => {
    this.formGroup.reset();
    this.unitState.clean();
    this.onSubmit()
  };
}
