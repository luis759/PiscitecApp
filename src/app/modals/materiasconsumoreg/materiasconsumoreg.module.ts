import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicSelectableModule } from 'ionic-selectable';
import { MateriasconsumoregPageRoutingModule } from './materiasconsumoreg-routing.module';

import { MateriasconsumoregPage } from './materiasconsumoreg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    IonicModule,
    MateriasconsumoregPageRoutingModule
  ],
  declarations: [MateriasconsumoregPage]
})
export class MateriasconsumoregPageModule {}
