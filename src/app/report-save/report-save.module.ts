import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportSavePageRoutingModule } from './report-save-routing.module';

import { ReportSavePage } from './report-save.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportSavePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ReportSavePage]
})
export class ReportSavePageModule {}
