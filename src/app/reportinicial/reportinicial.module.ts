import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';

import { ReportinicialPageRoutingModule } from './reportinicial-routing.module';

import { ReportinicialPage } from './reportinicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    ReportinicialPageRoutingModule
  ],
  declarations: [ReportinicialPage]
})
export class ReportinicialPageModule {}
