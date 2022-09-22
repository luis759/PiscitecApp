import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriasconsumoregPage } from './materiasconsumoreg.page';

const routes: Routes = [
  {
    path: '',
    component: MateriasconsumoregPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriasconsumoregPageRoutingModule {}
