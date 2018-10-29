import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard';
import { ExpandingCardListComponent } from './shared/expanding-card-list/expanding-card-list';
import { DateNavigatorComponent } from './shared/date-navigator/date-navigator';
import { ReportsComponent } from './reports/reports';
import { ClosingsComponent } from './closings/closings';
import { CompanyCarComponent } from './company-car/company-car';
import { InvoiceComponent } from './invoice/invoice';
import { MissionComponent } from './mission/mission';
import { OverviewComponent } from './overview/overview';
import { StatisticsComponent } from './statistics/statistics';
import { WageCenterComponent } from './wage-center/wage-center';
import { InfoFabComponent } from './shared/info-fab/info-fab';
import { StatCardComponent } from './shared/stat-card/stat-card';
import { SelectCardComponent } from './shared/select-card/select-card';
import { ChartsComponent } from './shared/charts/charts';
@NgModule({
	declarations: [
    DateNavigatorComponent,
    ExpandingCardListComponent,
    DashboardComponent,
    ReportsComponent,
    ClosingsComponent,
    CompanyCarComponent,
    InvoiceComponent,
    MissionComponent,
    OverviewComponent,
    StatisticsComponent,
    WageCenterComponent,
    InfoFabComponent,
    StatCardComponent,
    SelectCardComponent,
    ChartsComponent
  ],
	imports: [IonicModule,ChartsModule],
	exports: [
    DateNavigatorComponent,
    ExpandingCardListComponent,
    DashboardComponent,
    ReportsComponent,
    ClosingsComponent,
    CompanyCarComponent,
    InvoiceComponent,
    MissionComponent,
    OverviewComponent,
    StatisticsComponent,
    WageCenterComponent,
    InfoFabComponent,
    StatCardComponent,
    SelectCardComponent,
    ChartsComponent
  ]
})
export class ComponentsModule {}
