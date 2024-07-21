import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { FormComponent } from '@components/form/form.component';
import { HeaderComponent } from '@components/header/header.component';
import { UnitsListComponent } from '@components/units-list/units-list.component';

import { UnitLocation } from '@models/unit';

import { UnitState } from '@states/unit.state';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, RouterOutlet, HeaderComponent, FormComponent, UnitsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private unitState = inject(UnitState);

  protected units$: Observable<UnitLocation[]> = this.unitState.units$;
}
