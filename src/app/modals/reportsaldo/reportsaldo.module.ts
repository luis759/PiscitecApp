import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicSelectableModule } from 'ionic-selectable';
import { ReportsaldoPageRoutingModule } from './reportsaldo-routing.module';

import { ReportsaldoPage } from './reportsaldo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    IonicModule,
    ReportsaldoPageRoutingModule
  ],
  declarations: [ReportsaldoPage]
})
export class ReportsaldoPageModule {}
