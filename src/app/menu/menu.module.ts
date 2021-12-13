import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { ReportdetallePage } from '../modals/reportdetalle/reportdetalle.page';
import { ReportdetallePageModule } from '../modals/reportdetalle/reportdetalle.module';
import { ReportsaldoPage } from '../modals/reportsaldo/reportsaldo.page';
import { ReportsaldoPageModule } from '../modals/reportsaldo/reportsaldo.module';

@NgModule({
  entryComponents:[
    ReportdetallePage,
    ReportsaldoPage
    ],
  imports: [
    ReportdetallePageModule,
    ReportsaldoPageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
