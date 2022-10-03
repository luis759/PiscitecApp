import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { MenuPage } from 'src/app/menu/menu.page';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-materiasconsumoreg',
  templateUrl: './materiasconsumoreg.page.html',
  styleUrls: ['./materiasconsumoreg.page.scss'],
})
export class MateriasconsumoregPage implements OnInit {
  @Input() public idgranja: any
  DataForm={
    observaciones:'',
    Lotes:'',
    cantidad:'',
    espacios:null,
    materia:null
  }
  idgranjas=0
  idempresa=0
  espaciosprod=[]
  materias=[]
  listConsumos=[
  {
    Lotes:10,
    Cantidad:10
  }
  ]
  consumosValores=[]
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,
    navParams: NavParams) {
      if(navParams.get('idempresa')){
        this.idempresa=navParams.get('idempresa')
      }
      if(navParams.get('idgranja')){
        this.idgranjas=navParams.get('idgranja')
      }
      this.master.storage.getItems(this.master.storage.arrayname.EspaciosByCod).then((DataEspacios)=>{
        let espacioss=[]
        if(DataEspacios){
          for(let i=0;i<DataEspacios[0].length;i++){
            if(DataEspacios[0][i]['IDEMP']== this.idempresa && DataEspacios[0][i]['IDGRA']==this.idgranjas){
              let val=espacioss.push(DataEspacios[0][i])
            }
          }
          this.espaciosprod=espacioss
        }
      })
      
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
  changematerias(evento){
    let materias=evento.value['IDGRA']
  }
}
