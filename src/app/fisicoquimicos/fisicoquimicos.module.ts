import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { FisicoquimicosPageRoutingModule } from './fisicoquimicos-routing.module';

import { FisicoquimicosPage } from './fisicoquimicos.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    FisicoquimicosPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [FisicoquimicosPage]
})
export class FisicoquimicosPageModule {}
