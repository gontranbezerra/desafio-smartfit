import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { UnitLocation } from '@models/unit';

@Component({
  selector: 'app-unit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unit-card.component.html',
  styleUrl: './unit-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitCardComponent {
  unit = input.required<UnitLocation>();
}
