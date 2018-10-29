import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkerProfilePage } from './worker-profile';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WorkerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(WorkerProfilePage),
    ComponentsModule
  ],
})
export class WorkerProfilePageModule {}
