import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { DashboardComponent } from './dashboard/dashboard';
import { ExpandingCardListComponent } from './shared/expanding-card-list/expanding-card-list';
import { DateNavigatorComponent } from './shared/date-navigator/date-navigator';
@NgModule({
	declarations: [
    DateNavigatorComponent,
    ExpandingCardListComponent,
    DashboardComponent
  ],
	imports: [IonicModule],
	exports: [
    DateNavigatorComponent,
    ExpandingCardListComponent,
    DashboardComponent
  ]
})
export class ComponentsModule {}
