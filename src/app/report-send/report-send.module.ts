import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportSendPageRoutingModule } from './report-send-routing.module';

import { ReportSendPage } from './report-send.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportSendPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ReportSendPage]
})
export class ReportSendPageModule {}
