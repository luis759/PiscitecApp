import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadPageRoutingModule } from './load-routing.module';

import { LoadPage } from './load.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [LoadPage]
})
export class LoadPageModule {}
