import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { MortalidadPageRoutingModule } from './mortalidad-routing.module';

import { MortalidadPage } from './mortalidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    MortalidadPageRoutingModule
  ],
  declarations: [MortalidadPage]
})
export class MortalidadPageModule {}
