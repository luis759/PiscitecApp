import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportinicialPage } from './reportinicial.page';

const routes: Routes = [
  {
    path: '',
    component: ReportinicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportinicialPageRoutingModule {}
