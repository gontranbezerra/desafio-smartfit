import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  results = signal<number[]>([]);
}
