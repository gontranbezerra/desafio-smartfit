import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { FooterComponent } from '@components/footer/footer.component';
import { FormComponent } from '@components/form/form.component';
import { HeaderComponent } from '@components/header/header.component';
import { LegendComponent } from '@components/legend/legend.component';
import { UnitsListComponent } from '@components/units-list/units-list.component';

import { UnitLocation } from '@models/unit';

import { UnitState } from '@states/unit.state';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    FormComponent,
    LegendComponent,
    UnitsListComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private unitState = inject(UnitState);

  protected units$: Observable<UnitLocation[]> = this.unitState.units$;
}
