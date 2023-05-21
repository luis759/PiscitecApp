import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicSelectableModule } from 'ionic-selectable';
import { ReportdetallePageRoutingModule } from './reportdetalle-routing.module';

import { ReportdetallePage } from './reportdetalle.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    IonicModule,
    ReportdetallePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ReportdetallePage]
})
export class ReportdetallePageModule {}
