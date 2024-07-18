import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UnitResponse } from '@models/unit';

import { UnitService } from '@services/unit.service';

import { take } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  results = signal<number[]>([]);

  private nnfb = new FormBuilder().nonNullable;
  private unitsService = inject(UnitService);

  protected formGroup = this.nnfb.group({
    hour: ['', Validators.required],
    showClosed: [false, Validators.required],
  });

  ngOnInit(): void {
    this.getAllUnits();
  }

  onSubmit = () => {
    this.printForm();
  };

  onClean = () => {
    this.formGroup.reset();
  };

  protected printForm() {
    console.log(this.formGroup.value);
  }

  private getAllUnits() {
    this.unitsService
      .getAllUnits()
      .pipe(take(1))
      .subscribe({
        next: (units: UnitResponse) => {
          console.log(units);
        },
        error: (error) => console.error(error),
      });
  }
}
