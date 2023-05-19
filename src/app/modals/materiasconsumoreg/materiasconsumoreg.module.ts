import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicSelectableModule } from 'ionic-selectable';
import { MateriasconsumoregPageRoutingModule } from './materiasconsumoreg-routing.module';

import { MateriasconsumoregPage } from './materiasconsumoreg.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    IonicModule,
    MateriasconsumoregPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [MateriasconsumoregPage]
})
export class MateriasconsumoregPageModule {}
