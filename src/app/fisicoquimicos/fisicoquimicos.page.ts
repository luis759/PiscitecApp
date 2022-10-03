import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { MenuPage } from '../menu/menu.page';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-fisicoquimicos',
  templateUrl: './fisicoquimicos.page.html',
  styleUrls: ['./fisicoquimicos.page.scss'],
})
export class FisicoquimicosPage implements OnInit {
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  
  DataForm={
    observaciones:'',
    fecha:new Date().toString(),
    startdate:new Date().toString(),
    enddate:new Date().toString(),
    empresa:null,
    granja:null,
    espacio:null,
    responsable:null
  }
  empresas=[]
  granjas=[]
  espacios=[]
  responsables=[]
  todoslosparametros=[]
  yearMax=(new Date().getFullYear())+1
  yearMin=(new Date().getFullYear())-1
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,private navcontroll:NavController,private menu:MenuPage) { }

  ngOnInit() {
    this.menu.activarmenuDesactivar(false);
    this.incializar()
  }
  incializar(){
    this.master.storage.getItems(this.master.storage.arrayname.fisicosquimicosparametros).then((Parametros)=>{
      if(Parametros[0].length>0){
        this.todoslosparametros=Parametros[0]
      }else{
        this.master.toastMensaje("No hay informacion",2000)
        this.todoslosparametros=[]
      }
    })
    this.master.storage.getItems(this.master.storage.arrayname.Empresas).then((Empresass)=>{
       if(Empresass){
        this.empresas=Empresass[0]
       }else{
        this.empresas=[]
       }
    })
  }
  changeResponsable(evento){

  }
  ngOnDestroy() {
    this.menu.activarmenuDesactivar(true);
  }
  changeEmpresas(evento){
    let idempres=evento.value['IDEMP']
    let mostrarGranjas=[]
    this.granjas=[]
    this.DataForm.espacio=null
    this.espacios=[]
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
    this.DataForm.espacio=null
    this.espacios=[]
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
  limpiarData(){
    this.DataForm={
      observaciones:'',
      fecha:new Date().toString(),
      startdate:new Date().toString(),
      enddate:new Date().toString(),
      empresa:null,
      granja:null,
      espacio:null,
      responsable:null
    }
    this.empresas=[]
    this.granjas=[]
    this.espacios=[]
    this.responsables=[]
    this.todoslosparametros=[]
    this.incializar()
  }
  ValidarRegistro()
  {
    
    if(this.DataForm.empresa){
        if(this.DataForm.granja){
          if(this.DataForm.responsable){
            if(this.DataForm.espacio){
              let infoseguir =this.validarInfoDataEnvio();
              if(infoseguir['paso']){
                this.seguir()
              }else{
                this.master.MensajeAlert(infoseguir['mensaje'],"Reporte FisicoQuimicos")
              }
            }else{
              this.master.MensajeAlert("Debe seleccionar un espacio","Reporte FisicoQuimicos")
            }
          
          }else{  
            this.master.MensajeAlert("Debe seleccionar un responsable","Reporte FisicoQuimicos")
          }
        }else{
          this.master.MensajeAlert("Debe seleccionar una granja","Reporte FisicoQuimicos")
        }
      }else{
        this.master.MensajeAlert("Debe seleccionar una empresa","Reporte FisicoQuimicos")
      }
}
validarInfoDataEnvio(){
  let datajson={
    paso:true,
    mensaje:''
  }
  let cantidad=0;

  do {
    if(this.todoslosparametros[cantidad]['valoratomar']>this.todoslosparametros[cantidad]['VALMAX']){
      datajson.paso=false;
      datajson.mensaje=this.todoslosparametros[cantidad]['PARAMETRO']+", debe ser menor o igual a "+this.todoslosparametros[cantidad]['VALMAX']+" "+this.todoslosparametros[cantidad]['UNIDAD']
    }else if (this.todoslosparametros[cantidad]['valoratomar']<this.todoslosparametros[cantidad]['VALMIN'] ){
      datajson.paso=false;
      datajson.mensaje=this.todoslosparametros[cantidad]['PARAMETRO']+", debe ser mayor o igual a "+this.todoslosparametros[cantidad]['VALMIN']+" "+this.todoslosparametros[cantidad]['UNIDAD']
    }
    cantidad++;
  }while ((cantidad<this.todoslosparametros.length) && datajson.paso); 
  cantidad=0;  
  if(datajson.paso){
    datajson.paso=false
    datajson.mensaje="Debes seleccionar algun parametro"
    do {
      if((this.todoslosparametros[cantidad]['valoratomar'])){
          datajson.paso=true
          datajson.mensaje=""
      }
      cantidad++;
    }while ((cantidad<this.todoslosparametros.length) && !datajson.paso); 
  }

  return datajson;
}

seguir(){
  
  this.master.Load(this.loadingController).then(()=>{
    this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((Usuario)=>{
      let id=Usuario[0]['Cedula']
      let valor=this.master.fisicoquimicos.FisicoQuimico
      valor.ANEXO=''
      valor.FECHA=formatDate(new  Date(this.DataForm.fecha) , 'yyyy-MM-dd', 'en')
      valor.HORA=this.DataForm.startdate?formatDate(new  Date(this.DataForm.startdate) , 'yyyy-MM-dd HH:mm:ss', 'en'):''
      valor.IDESPA=this.DataForm.espacio['COD']
      valor.IDEMP=this.DataForm.empresa['IDEMP']
      valor.IDGRA=this.DataForm.granja['IDGRA']
      valor.OBSERVA=this.DataForm.observaciones
      valor.RESPONSABLE=this.DataForm.responsable['COD']
      valor.detallejson=JSON.stringify(this.retornodeArrayFisicoQuimicos())
      valor.USUARIO=id
        this.master.fisicoquimicos.postNewFisicoQuimicos(valor).then((NewFisicosQuimicos)=>{
          let ReporteGen=this.master.storage.vacunareporte
          ReporteGen.ReporteInicial=valor
          ReporteGen.enviado=false
          if(!NewFisicosQuimicos['correcto'] && NewFisicosQuimicos['data']['status']==-1){
            this.GuardarRegistroDeReportes(ReporteGen,false,false)
            this.loadingController.dismiss()
            this.limpiarData()
          }else{
            if(NewFisicosQuimicos['correcto']){
              ReporteGen.dataEnviado=NewFisicosQuimicos['data']
              ReporteGen.enviado=true
              this.GuardarRegistroDeReportes(ReporteGen,true,false)
              this.loadingController.dismiss()
              this.limpiarData()
            }else if(NewFisicosQuimicos['correcto'] && NewFisicosQuimicos['mensaje']=="errorapi"){ 
              ReporteGen.enviado=true
              ReporteGen.dataEnviado=NewFisicosQuimicos['data']
              this.GuardarRegistroDeReportes(ReporteGen,true,true)
              this.loadingController.dismiss()
              this.limpiarData()
            }else{
              this.GuardarRegistroDeReportes(ReporteGen,false,true)
              this.loadingController.dismiss()
              this.limpiarData()
            }
          }
        })
      })
  })

}
retornodeArrayFisicoQuimicos():any[]{
  let arreglo=[]
  for (let i = 0; i < this.todoslosparametros.length; i++) {
    if(this.todoslosparametros[i]['valoratomar']){
      arreglo.push({
        variable:this.todoslosparametros[i]['PARAMETRO'],
        valor:this.todoslosparametros[i]['valoratomar']
      })
    }
  }
  return arreglo
}
GuardarRegistroDeReportes(Report,Enviado,Erroes){
  this.master.storage.getItems(this.master.storage.arrayname.FisiscosQuimicosRep).then((Info)=>{
    let Registros=[]
    if(Info){
     Registros=Info[0]
    }
    this.master.storage.DeleteKey(this.master.storage.arrayname.FisiscosQuimicosRep).then(()=>{
      let array=Registros
      let valor=array.push(Report)
      this.master.storage.addItem(this.master.storage.arrayname.FisiscosQuimicosRep,array).then(()=>{
        if(Enviado){
          this.limpiarData()
          this.master.MensajeAlert("Registro Guardado y Enviado","Reporte Incial")
        }else{
          this.limpiarData()
          this.master.MensajeAlert("Registro Guardado","Reporte Incial")
        }
      })
    })
  })
}
  onOpen(event) {
    if(this.DataForm.empresa){
      if(this.DataForm.granja){
        this.master.Load(this.loadingController).then(()=>{
          this.master.storage.getItems(this.master.storage.arrayname.EspaciosByCod).then((DataEspacios)=>{
            let espacioss=[]
            if(DataEspacios){
              for(let i=0;i<DataEspacios[0].length;i++){
                if(DataEspacios[0][i]['IDEMP']==this.DataForm.empresa['IDEMP'] && DataEspacios[0][i]['IDGRA']==this.DataForm.granja['IDGRA']){
                  let val=espacioss.push(DataEspacios[0][i])
                }
              }
              this.espacios=espacioss
            }
            this.loadingController.dismiss()
          })  
        })
      }else{
        this.espacios=[]
        this.portComponent.close();
      this.master.toastMensaje("Error debe seleccionar una granja",2000)
      }
    }else{
      this.espacios=[]
      this.portComponent.close();
      this.master.toastMensaje("Error debe seleccionar una empresa",2000)
    }
  }
}