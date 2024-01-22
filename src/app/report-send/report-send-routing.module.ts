import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportSendPage } from './report-send.page';

const routes: Routes = [
  {
    path: '',
    component: ReportSendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportSendPageRoutingModule {}
