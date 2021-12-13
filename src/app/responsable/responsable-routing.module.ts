import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsablePage } from './responsable.page';

const routes: Routes = [
  {
    path: '',
    component: ResponsablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsablePageRoutingModule {}
