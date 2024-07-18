import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  results = signal<number[]>([]);

  private nnfb = new FormBuilder().nonNullable;

  public formGroup = this.nnfb.group({
    hour: ['', Validators.required],
    showClosed: [false, Validators.required],
  });

  onSubmit = () => {
    this.printForm();
  };

  onClean = () => {
    this.formGroup.reset();
  };

  protected printForm() {
    console.log(this.formGroup.value);
  }
}
