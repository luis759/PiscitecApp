import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { IonicSelectableModule } from 'ionic-selectable';
import { ReportvacunPageRoutingModule } from './reportvacun-routing.module';

import { ReportvacunPage } from './reportvacun.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    ReportvacunPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ReportvacunPage]
})
export class ReportvacunPageModule {}
