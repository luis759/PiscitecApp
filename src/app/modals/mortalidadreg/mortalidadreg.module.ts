import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicSelectableModule } from 'ionic-selectable';

import { MortalidadregPageRoutingModule } from './mortalidadreg-routing.module';

import { MortalidadregPage } from './mortalidadreg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    MortalidadregPageRoutingModule
  ],
  declarations: [MortalidadregPage]
})
export class MortalidadregPageModule {}
