import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { DietasignadaPageRoutingModule } from './dietasignada-routing.module';

import { DietasignadaPage } from './dietasignada.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    DietasignadaPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [DietasignadaPage]
})
export class DietasignadaPageModule {}
