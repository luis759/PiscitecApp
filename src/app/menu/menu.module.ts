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
import { MateriasconsumoregPage } from '../modals/materiasconsumoreg/materiasconsumoreg.page';
import { MateriasconsumoregPageModule } from '../modals/materiasconsumoreg/materiasconsumoreg.module';
import { MortalidadregPage } from '../modals/mortalidadreg/mortalidadreg.page';
import { MortalidadregPageModule } from '../modals/mortalidadreg/mortalidadreg.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  entryComponents:[
    ReportdetallePage,
    ReportsaldoPage,
    MateriasconsumoregPage,
    MortalidadregPage
    ],
  imports: [
    ReportdetallePageModule,
    ReportsaldoPageModule,
    MateriasconsumoregPageModule,
    MortalidadregPageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
