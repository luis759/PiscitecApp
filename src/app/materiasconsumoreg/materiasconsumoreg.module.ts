import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriasconsumoregPageRoutingModule } from './materiasconsumoreg-routing.module';

import { MateriasconsumoregPage } from './materiasconsumoreg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriasconsumoregPageRoutingModule
  ],
  declarations: [MateriasconsumoregPage]
})
export class MateriasconsumoregPageModule {}
