import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { MenuPage } from '../menu/menu.page';
import { MortalidadregPage } from '../modals/mortalidadreg/mortalidadreg.page';
import { MasterService } from '../services/master.service';
@Component({
  selector: 'app-mortalidad',
  templateUrl: './mortalidad.page.html',
  styleUrls: ['./mortalidad.page.scss'],
})
export class MortalidadPage implements OnInit {
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
    const modal=await this.modalController.create({
      component:MortalidadregPage,
      componentProps:{
        materiasprimas:this.listmaterias,
        espaciosproductivos:this.espaciosproductivos
      }
    });
    modal.onDidDismiss().then((detalles)=>{
      if(detalles.data){
        this.listConsumos=this.listConsumos.concat(detalles.data)
      }
    })
    return await modal.present()
  }

}
