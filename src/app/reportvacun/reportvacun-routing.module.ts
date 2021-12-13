import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportvacunPage } from './reportvacun.page';

const routes: Routes = [
  {
    path: '',
    component: ReportvacunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportvacunPageRoutingModule {}
