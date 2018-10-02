import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanySelectionPage } from './company-selection';

@NgModule({
  declarations: [
    CompanySelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanySelectionPage),
  ],
})
export class CompanySelectionPageModule {}
