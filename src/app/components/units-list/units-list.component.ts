import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { UnitLocation } from '@models/unit';

@Component({
  selector: 'app-units-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './units-list.component.html',
  styleUrl: './units-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsListComponent {
  // private unitState = inject(UnitState);

  // protected units$: Observable<UnitLocation[]> = this.unitState.units$;

  // units = toSignal(this.units$, { initialValue: [] });

  units = input.required<UnitLocation[]>();
}
