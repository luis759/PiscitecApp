import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { MateriasconsumoPageRoutingModule } from './materiasconsumo-routing.module';

import { MateriasconsumoPage } from './materiasconsumo.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    MateriasconsumoPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [MateriasconsumoPage]
})
export class MateriasconsumoPageModule {}
