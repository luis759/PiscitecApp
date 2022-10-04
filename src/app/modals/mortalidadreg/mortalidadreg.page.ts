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
  @Input() public idgranja: any
  @Input() public idempresa: any
  DataForm={
    observaciones:'',
    kilosam:'',
    cantidadpm:'',
    kilospm:'',
    Lote:"",
    cantidadam:'',
    espacios:null,
    causas:null
  }
  idgranjas=0
  idempresas=0
  espaciosprod=[]
  causass=[]
  mortalidades=[]
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,
    navParams: NavParams) {
      if(navParams.get('idempresa')){
        this.idempresas=navParams.get('idempresa')
      }
      if(navParams.get('idgranja')){
        this.idgranjas=navParams.get('idgranja')
        
      }
      this.master.storage.getItems(this.master.storage.arrayname.EspaciosByCod).then((DataEspacios)=>{
      let espacioss=[]
      if(DataEspacios){
        for(let i=0;i<DataEspacios[0].length;i++){
          if(DataEspacios[0][i]['IDEMP']== this.idempresas && DataEspacios[0][i]['IDGRA']==this.idgranjas){
            let val=espacioss.push(DataEspacios[0][i])
          }
        }
        this.espaciosprod=espacioss
      }
    })
    this.master.storage.getItems(this.master.storage.arrayname.Causas).then((dataCausas)=>{
      let espacioss=[]
      if(dataCausas){
        this.causass=dataCausas[0]
      }
    })
    this.agregarValorAlista()
   }
   agregarValorAlista(){
    this.master.storage.getItems("valorretornomortalidad").then((datos)=>{
      if(datos){
        if(datos.length>0){
          this.mortalidades=datos[0]
        }
      }
    })
  }
  ngOnInit() {
  }
  
  agregarotro(){
    if(Number(this.DataForm.cantidadam)>0){
      if(Number(this.DataForm.cantidadpm)>0){
        if(Number(this.DataForm.cantidadam)>0){
          if(Number(this.DataForm.cantidadpm)>0){
        if(this.DataForm.causas){
          if(this.DataForm.espacios){
            if(Number(this.DataForm.Lote)>0){
              this.agregarValor()

            }else{
              this.master.toastMensaje("Lotes debe ser Mayor a 0",3000)
            }
          }else{
            this.master.toastMensaje("es necesario un Espacio",3000)
          }
        }else{
          this.master.toastMensaje("es necesario una Causa",3000)
          
        }
      }else{
        this.master.toastMensaje("Kilos PM debe ser Mayor a 0",3000)

      }
    }else{
      this.master.toastMensaje("Kilos AM debe ser Mayor a 0",3000)

    }
      }else{
        this.master.toastMensaje("Cantidad PM debe ser Mayor a 0",3000)

      }
    }else{
      this.master.toastMensaje("Cantidad AM debe ser Mayor a 0",3000)

    }
   }
  finalizar(){
    
    if(Number(this.DataForm.cantidadam)>0){
      if(Number(this.DataForm.cantidadpm)>0){
        if(Number(this.DataForm.cantidadam)>0){
          if(Number(this.DataForm.cantidadpm)>0){
        if(this.DataForm.causas){
          if(this.DataForm.espacios){
            if(Number(this.DataForm.Lote)>0){
              this.modalController.dismiss()
              this.agregarValor()
            }else{
              this.master.toastMensaje("Lotes debe ser Mayor a 0",3000)
            }
          }else{
            this.master.toastMensaje("es necesario un Espacio",3000)
          }
        }else{
          this.master.toastMensaje("es necesario una Causa",3000)
          
        }
      }else{
        this.master.toastMensaje("Kilos PM debe ser Mayor a 0",3000)

      }
    }else{
      this.master.toastMensaje("Kilos AM debe ser Mayor a 0",3000)

    }
      }else{
        this.master.toastMensaje("Cantidad PM debe ser Mayor a 0",3000)

      }
    }else{
      this.master.toastMensaje("Cantidad AM debe ser Mayor a 0",3000)

    }
  }
  agregarValor(){
    this.mortalidades.push({
      CODESPA:this.DataForm.espacios['COD'],
      CAUSA:this.DataForm.causas['CODIGO'],
      CANTAM:this.DataForm.cantidadam,
      CANTPM:this.DataForm.cantidadpm,
      KILOSAM:this.DataForm.kilosam,
      KILOSPM:this.DataForm.kilospm,
      LOTE:this.DataForm.Lote,
      OBSERVA:this.DataForm.observaciones
    })
    this.master.storage.DeleteKey("valorretornomortalidad").then(()=>{
      this.master.storage.addItem("valorretornomortalidad",this.mortalidades).then(()=>{
        this.DataForm.cantidadam="";
        this.DataForm.cantidadpm="";
        this.DataForm.kilosam="";
        this.DataForm.kilospm="";
        this.DataForm.espacios=null;
        this.DataForm.causas=null;
        this.DataForm.observaciones="";
      })
    })
  }
  changeespacios(evento){
    let espacios=evento.value['IDEMP']

  }
  changecausas(evento){
    let causas=evento.value['IDGRA']
  }

}
