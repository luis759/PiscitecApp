import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  reportes=[{
    id:1,
    name:"Biometrias"
  },{
    id:2,
    name:"Vacunas"
  },{
    id:4,
    name:"Mortalidad"
  },{
    id:3,
    name:"Fisicos - Quimicos"
  }]
  inventarios=[{
    id:1,
    name:"Consumo de Materias"
  }]
  valorinicial=0
  constructor(private navcontorll:NavController,private master:MasterService) {}
  radioGroupChange(evento){
    this.valorinicial=evento.detail.value;
  }
  irAlGenerarReporte(){
    if(this.valorinicial==0){

    }else{
      if(this.valorinicial==1){
        this.navcontorll.navigateForward("menu/reportinicial")
      }else  if(this.valorinicial==2){
        this.navcontorll.navigateForward("menu/reportvacun")
      }else{
        this.navcontorll.navigateForward("menu/fisicoquimicos")
      }
    }
  }
}
