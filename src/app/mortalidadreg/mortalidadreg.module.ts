import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MortalidadregPageRoutingModule } from './mortalidadreg-routing.module';

import { MortalidadregPage } from './mortalidadreg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MortalidadregPageRoutingModule
  ],
  declarations: [MortalidadregPage]
})
export class MortalidadregPageModule {}
