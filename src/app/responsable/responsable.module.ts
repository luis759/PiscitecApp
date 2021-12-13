import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponsablePageRoutingModule } from './responsable-routing.module';

import { IonicSelectableModule } from 'ionic-selectable';
import { ResponsablePage } from './responsable.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    ResponsablePageRoutingModule
  ],
  declarations: [ResponsablePage]
})
export class ResponsablePageModule {}
