import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { UnitCardComponent } from '@components/unit-card/unit-card.component';

import { UnitLocation } from '@models/unit';

@Component({
  selector: 'app-units-list',
  standalone: true,
  imports: [CommonModule, UnitCardComponent],
  templateUrl: './units-list.component.html',
  styleUrl: './units-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsListComponent {
  public units = input.required<UnitLocation[]>();
}
