import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Fountain, LockerRoom, Mask, Towel } from '@models/unit';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegendComponent {
  protected readonly legends = {
    0: {
      group: 'mask',
      title: 'Máscara',
      labels: [
        { label: 'Obrigatório', value: Mask.Required },
        { label: 'Recomendado', value: Mask.Recommended },
      ],
    },
    1: {
      group: 'towel',
      title: 'Toalha',
      labels: [
        { label: 'Obrigatório', value: Towel.Required },
        { label: 'Recomendado', value: Towel.Recommended },
      ],
    },
    2: {
      group: 'fountain',
      title: 'Bebedouro',
      labels: [
        { label: 'Parcial', value: Fountain.Partial },
        { label: 'Proibido', value: Fountain.NotAllowed },
      ],
    },
    3: {
      group: 'lockerroom',
      title: 'Vestiários',
      labels: [
        { label: 'Liberado', value: LockerRoom.Allowed },
        { label: 'Parcial', value: LockerRoom.Partial },
        { label: 'Fechado', value: LockerRoom.Closed },
      ],
    },
  };
}
