import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { MenuPage } from 'src/app/menu/menu.page';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-mortalidadreg',
  templateUrl: './mortalidadreg.page.html',
  styleUrls: ['./mortalidadreg.page.scss'],
})
export class MortalidadregPage implements OnInit {
  @Input() public causas: any
  @Input() public espaciosproductivos: any
  DataForm={
    observaciones:'',
    kilosam:'',
    cantidadpm:'',
    kilospm:'',
    cantidadam:'',
    espacios:null,
    causas:null
  }
  espaciosprod=[]
  causass=[]
  consumosValores=[]
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,
    navParams: NavParams) {
     if(navParams.get('causas')){
        this.causass=navParams.get('causas')
      }
      if(navParams.get('espaciosproductivos')){
        this.espaciosprod=navParams.get('espaciosproductivos')
      }
   }

  finalizar(){
    this.modalController.dismiss(this.consumosValores).then(()=>{
    })
  }
  ngOnInit() {
  }
  changeespacios(evento){
    let espacios=evento.value['IDEMP']

  }
  changecausas(evento){
    let causas=evento.value['IDGRA']
  }

}
