import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicSelectableModule } from 'ionic-selectable';
import { ReportsaldoPageRoutingModule } from './reportsaldo-routing.module';

import { ReportsaldoPage } from './reportsaldo.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    IonicModule,
    ReportsaldoPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ReportsaldoPage]
})
export class ReportsaldoPageModule {}
