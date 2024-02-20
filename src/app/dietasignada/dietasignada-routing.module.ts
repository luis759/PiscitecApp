import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietasignadaPage } from './dietasignada.page';

const routes: Routes = [
  {
    path: '',
    component: DietasignadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietasignadaPageRoutingModule {}
