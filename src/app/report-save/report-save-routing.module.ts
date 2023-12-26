import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportSavePage } from './report-save.page';

const routes: Routes = [
  {
    path: '',
    component: ReportSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportSavePageRoutingModule {}
