import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { MenuPage } from '../menu/menu.page';
import { MateriasconsumoregPage } from '../modals/materiasconsumoreg/materiasconsumoreg.page';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-materiasconsumo',
  templateUrl: './materiasconsumo.page.html',
  styleUrls: ['./materiasconsumo.page.scss'],
})
export class MateriasconsumoPage implements OnInit {
  DataForm={
    observaciones:'',
    fecha:new Date().toString(),
    empresa:null,
    granja:null,
    responsable:null
  }
  empresas=[]
  granjas=[]
  responsables=[]
  listConsumos=[
  {
    Lotes:10,
    Cantidad:10
  }
  ]
  listmaterias=[]
  espaciosproductivos=[]
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,private menu:MenuPage) { }

  
  ngOnInit() {
    this.menu.activarmenuDesactivar(false);
    this.master.storage.getItems(this.master.storage.arrayname.Empresas).then((Empresass)=>{
       if(Empresass){
        this.empresas=Empresass[0]
       }else{
        this.empresas=[]
       }
    })
  }
  ValidarRegistro(){

  }
  ngOnDestroy() {
    this.menu.activarmenuDesactivar(true);
  }
  changeEmpresas(evento){
    let idempres=evento.value['IDEMP']
    let mostrarGranjas=[]
    this.granjas=[]
    this.responsables=[]
    this.DataForm.granja=null
    this.DataForm.responsable=null
    this.master.storage.getItems(this.master.storage.arrayname.Granjas).then((Granjas)=>{
      if(Granjas){
        for(let i=0;i<Granjas[0].length;i++){
          if(Granjas[0][i]['IDEMP']==idempres){
            let val=mostrarGranjas.push(Granjas[0][i])
          }
        }
        this.granjas=mostrarGranjas
      }
    })
  }
  changeGranjas(evento){
    let idgranjas=evento.value['IDGRA']
    let mostrarResponsables=[]
    this.responsables=[]
    this.DataForm.responsable=null
    this.master.storage.getItems(this.master.storage.arrayname.Responsables).then((Responsables)=>{
      if(Responsables){
        for(let i=0;i<Responsables[0].length;i++){
          if(Responsables[0][i]['IDGRA']==idgranjas && this.DataForm.empresa['IDEMP']==Responsables[0][i]['IDEMP']){
            let val=mostrarResponsables.push(Responsables[0][i])
          }
        }
        this.responsables=mostrarResponsables
      }
    })
  }
  async irAConsumos(){
    if(this.DataForm.granja){
      const modal=await this.modalController.create({
        component:MateriasconsumoregPage,
        componentProps:{
          idgranja:this.DataForm.granja
        }
      });
      modal.onDidDismiss().then((detalles)=>{
        if(detalles.data){
          this.listConsumos=this.listConsumos.concat(detalles.data)
        }
      })
      return await modal.present()
    }else{
      this.master.toastMensaje("Debes Seleccionar una Granja",4000)
    }
   
  }
}
