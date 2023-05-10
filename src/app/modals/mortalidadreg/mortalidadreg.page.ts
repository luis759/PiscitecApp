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
  @Input() public indexnumero: any
  DataForm={
    observaciones:'',
    kilosam:'',
    cantidadpm:'',
    kilospm:'',
    Lote:"",
    cantidadam:'',
    LoteSelec:null,
    espacios:null,
    causas:null
  }
  idgranjas=0
  idempresas=0
  idindex=-1
  espaciosprod=[]
  causass=[]
  mortalidades=[]
  Lote=[]
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,
    navParams: NavParams) {
      if(navParams.get('idempresa')){
        this.idempresas=navParams.get('idempresa')
      }
      if(navParams.get('idgranja')){
        this.idgranjas=navParams.get('idgranja')
        
      }
      if(navParams.get('indexnumero')>=0){
        this.idindex=navParams.get('indexnumero')
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
          if(this.idindex>=0){
            this.DataForm=datos[0][this.idindex].INFODATA
            this.showAllSelect()
          }
        }
      }
    })
  }
  ngOnInit() {
  }
  
  agregarotro(){
        if(this.DataForm.causas){
          if(this.DataForm.espacios){
            if(Number(this.DataForm.Lote)>0){
              if(this.Lote.length>0){
              if(this.DataForm.LoteSelec){
                this.agregarValor()
              }else{
                this.master.toastMensaje("es necesario un Lote",3000)
              }
            }else{
              this.agregarValor()
            }
            }else{
              this.master.toastMensaje("Lotes debe ser Mayor a 0",3000)
            }
          }else{
            this.master.toastMensaje("es necesario un Espacio",3000)
          }
        }else{
          this.master.toastMensaje("es necesario una Causa",3000)
          
        }
   }
  finalizar(){
    
              this.modalController.dismiss()
  }
  agregarValor(){
    if(this.idindex>=0){
      this.mortalidades[this.idindex]={
        CODESPA:this.DataForm.espacios['COD'],
        CAUSA:this.DataForm.causas['CODIGO'],
        CANTAM:this.DataForm.cantidadam,
        CANTPM:this.DataForm.cantidadpm,
        KILOSAM:this.DataForm.kilosam,
        KILOSPM:this.DataForm.kilospm,
        LOTE:this.DataForm.Lote,
        OBSERVA:this.DataForm.observaciones,
        INFODATA:{
          observaciones:this.DataForm.observaciones,
          kilosam:this.DataForm.kilosam,
          cantidadpm:this.DataForm.cantidadpm,
          kilospm:this.DataForm.kilospm,
          Lote:this.DataForm.Lote,
          LoteSelec:this.DataForm.LoteSelec,
          cantidadam:this.DataForm.cantidadam,
          espacios:this.DataForm.espacios,
          causas:this.DataForm.causas
        }
      }
      this.idindex=-1;
    }else{
      this.mortalidades.push({
        CODESPA:this.DataForm.espacios['COD'],
        CAUSA:this.DataForm.causas['CODIGO'],
        CANTAM:this.DataForm.cantidadam,
        CANTPM:this.DataForm.cantidadpm,
        KILOSAM:this.DataForm.kilosam,
        KILOSPM:this.DataForm.kilospm,
        LOTE:this.DataForm.Lote,
        OBSERVA:this.DataForm.observaciones,
        INFODATA:{
          observaciones:this.DataForm.observaciones,
          kilosam:this.DataForm.kilosam,
          cantidadpm:this.DataForm.cantidadpm,
          kilospm:this.DataForm.kilospm,
          Lote:this.DataForm.Lote,
          LoteSelec:this.DataForm.LoteSelec,
          cantidadam:this.DataForm.cantidadam,
          espacios:this.DataForm.espacios,
          causas:this.DataForm.causas
        }
      })
    }
    this.master.storage.DeleteKey("valorretornomortalidad").then(()=>{
      this.master.storage.addItem("valorretornomortalidad",this.mortalidades).then(()=>{
        this.DataForm.cantidadam="";
        this.DataForm.cantidadpm="";
        this.DataForm.kilosam="";
        this.DataForm.kilospm="";
        this.DataForm.espacios=null;
        this.DataForm.Lote="";
        this.DataForm.LoteSelec=null;
        this.DataForm.causas=null;
        this.DataForm.observaciones="";
      })
    })
  }
  changeespacios(evento){
    let espacios=evento.value['COD']
    this.master.storage.getItems(this.master.storage.arrayname.espacioLotesDiferentes).then((datos)=>{
      let datoss=datos[0].filter(dato=>Number(dato.IDEMP)===Number(this.idempresas) && Number(dato.IDGRA)===Number(this.idgranjas) && dato.COD===espacios)
      this.Lote=[]
      if(datoss.length>1){
        this.DataForm.LoteSelec=null
        this.Lote=datoss
      }else{
        if(!datoss[0]['LOTE']){
          this.master.toastMensaje("Este espacio productivo no tiene Lotes Sembrados",3000)
          this.Lote=datoss
          this.DataForm.LoteSelec=null
          this.DataForm.Lote="0"
        }else{
          this.Lote=datoss
          this.DataForm.LoteSelec=datoss[0]
          this.DataForm.Lote=datoss[0]['LOTE']?datoss[0]['LOTE']:0
          
        }
      }
    })
  }
  showAllSelect(){
    let espacios=this.DataForm.espacios['COD']
    this.master.storage.getItems(this.master.storage.arrayname.espacioLotesDiferentes).then((datos)=>{
      let datoss=datos[0].filter(dato=>Number(dato.IDEMP)===Number(this.idempresas) && Number(dato.IDGRA)===Number(this.idgranjas) && dato.COD===espacios)
      this.Lote=[]
      if(datoss.length>1){
        this.Lote=datoss
      }else{
        if(!datoss[0]['LOTE']){
          this.master.toastMensaje("Este espacio productivo no tiene Lotes Sembrados",3000)
          this.Lote=datoss
        }else{
          this.Lote=datoss
        }
      }
    })
  }
  changelotes(evento){
    if(!evento.value['LOTE']){
      this.master.toastMensaje("Este espacio productivo no tiene Lotes Sembrados",3000)
    }
    this.DataForm.Lote=evento.value['LOTE']?evento.value['LOTE']:0
    console.log(evento)
  }
  changecausas(evento){
    let causas=evento.value['IDGRA']
  }

}
