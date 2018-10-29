import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountingShowMonthPage } from './accounting-show-month';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AccountingShowMonthPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountingShowMonthPage),
    ComponentsModule
  ],
})
export class AccountingShowMonthPageModule {}
