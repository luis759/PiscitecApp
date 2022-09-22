import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriasconsumoPage } from './materiasconsumo.page';

const routes: Routes = [
  {
    path: '',
    component: MateriasconsumoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriasconsumoPageRoutingModule {}
