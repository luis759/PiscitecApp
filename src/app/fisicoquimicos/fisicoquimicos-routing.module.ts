import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FisicoquimicosPage } from './fisicoquimicos.page';

const routes: Routes = [
  {
    path: '',
    component: FisicoquimicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FisicoquimicosPageRoutingModule {}
