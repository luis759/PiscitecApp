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
    observacion:'',
    fecha:new Date().toString(),
    temperatura:0,
    alcalinidadtotal:0,
    turbidez:0,
    durezatotal:0,
    oxigenodisuelto:0,
    nitritos:0,
    amoniototal:0,
    ph:0,
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
  
  yearMax=(new Date().getFullYear())+1
  yearMin=(new Date().getFullYear())-1
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,private navcontroll:NavController,private menu:MenuPage) { }

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
      observacion:'',
      fecha:new Date().toString(),
      temperatura:0,
      alcalinidadtotal:0,
      turbidez:0,
      durezatotal:0,
      oxigenodisuelto:0,
      nitritos:0,
      amoniototal:0,
      ph:0,
      startdate:new Date().toString(),
      enddate:new Date().toString(),
      empresa:null,
      granja:null,
      espacio:null,
      responsable:null
    }
  }
  ValidarRegistro(){
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
    paso:false,
    mensaje:''
  }
  if(!this.DataForm.alcalinidadtotal && !this.DataForm.amoniototal &&!this.DataForm.durezatotal && !this.DataForm.nitritos 
    && !this.DataForm.oxigenodisuelto && !this.DataForm.ph && !this.DataForm.temperatura && !this.DataForm.turbidez ){
    datajson.mensaje="Al menos deberias seleccionar un parametro"
  }else if(this.DataForm.alcalinidadtotal==0 && this.DataForm.amoniototal==0 && this.DataForm.durezatotal==0 && this.DataForm.nitritos==0
    && this.DataForm.oxigenodisuelto==0 && this.DataForm.ph==0 && this.DataForm.temperatura==0 && this.DataForm.turbidez==0){
      datajson.mensaje="Todos los parametros estan seleccionado en 0"
  }else if(this.DataForm.temperatura<-100 || this.DataForm.temperatura>200){
    datajson.mensaje="No puede ser menor a -100 ni mayor a 200"
  }else if(this.DataForm.alcalinidadtotal<0){
    datajson.mensaje="La alcalinidad no puede ser menor a 0"
  } else if(this.DataForm.turbidez<0){
    datajson.mensaje="La turbidez no puede ser menor a 0"
  } else if(this.DataForm.durezatotal<0){
    datajson.mensaje="La dureza no puede ser menor a 0"
  }  else if(this.DataForm.oxigenodisuelto<0){
    datajson.mensaje="el oxigeno disuelto no puede ser menor a 0"
  } else if(this.DataForm.nitritos<0){
    datajson.mensaje="el nitritos no puede ser menor a 0"
  } else if(this.DataForm.amoniototal<0){
    datajson.mensaje="el amonio no puede ser menor a 0"
  } else if(this.DataForm.ph<0){
    datajson.mensaje="el ph no puede ser menor a 0"
  } else{
    datajson.paso=true;
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
      valor.IDESPA='VER ESPACIOS'
      valor.IDEMP=this.DataForm.empresa['IDEMP']
      valor.IDGRA=this.DataForm.granja['IDGRA']
      valor.OBSERVA=this.DataForm.observacion
      valor.RESPONSABLE=this.DataForm.responsable['COD']
      valor.detallejson=JSON.stringify(this.retornodeArrayFisicoQuimicos())
      valor.ANEXO=''
      valor.USUARIO=id
        this.master.fisicoquimicos.postNewFisicoQuimicos(valor).then((NewFisicosQuimicos)=>{
          let ReporteGen=this.master.storage.vacunareporte
          ReporteGen.ReporteInicial=valor
          ReporteGen.enviado=false
          if(!NewFisicosQuimicos['correcto'] && NewFisicosQuimicos['data']['status']==-1){
            this.GuardarRegistroDeReportes(ReporteGen,false,false)
            this.loadingController.dismiss()
          }else{
            if(NewFisicosQuimicos['correcto']){
              ReporteGen.dataEnviado=NewFisicosQuimicos['data']
              ReporteGen.enviado=true
              this.GuardarRegistroDeReportes(ReporteGen,true,false)
              this.loadingController.dismiss()
            }else if(NewFisicosQuimicos['correcto'] && NewFisicosQuimicos['mensaje']=="errorapi"){ 
              ReporteGen.enviado=true
              ReporteGen.dataEnviado=NewFisicosQuimicos['data']
              this.GuardarRegistroDeReportes(ReporteGen,true,true)
              this.loadingController.dismiss()
            }else{
              this.GuardarRegistroDeReportes(ReporteGen,false,true)
              this.loadingController.dismiss()
            }
          }
        })
      })
  })

}
retornodeArrayFisicoQuimicos():any[]{
  let arreglo=[]
  let variable={
    variable:'',
    valor:0
  }
          if(this.DataForm.temperatura){
            variable.valor=this.DataForm.temperatura    
            variable.variable='Tipo1'
            arreglo.push(variable)
          }
          if(this.DataForm.alcalinidadtotal){
            variable.valor=this.DataForm.alcalinidadtotal    
            variable.variable='Tipo2'
            arreglo.push(variable)
          }
          if(this.DataForm.turbidez){
            variable.valor=this.DataForm.turbidez    
            variable.variable='Tipo3'
            arreglo.push(variable)
          }

          if(this.DataForm.durezatotal){
            variable.valor=this.DataForm.durezatotal    
            variable.variable='Tipo4'
            arreglo.push(variable)
          }
          if(this.DataForm.oxigenodisuelto){
            variable.valor=this.DataForm.oxigenodisuelto    
            variable.variable='Tipo5'
            arreglo.push(variable)
          }
          if(this.DataForm.nitritos){
            variable.valor=this.DataForm.nitritos    
            variable.variable='Tipo6'
            arreglo.push(variable)
          }
          if(this.DataForm.amoniototal){
            variable.valor=this.DataForm.amoniototal    
            variable.variable='Tipo7'
            arreglo.push(variable)
          }
          if(this.DataForm.ph){
            variable.valor=this.DataForm.ph    
            variable.variable='Tipo8'
            arreglo.push(variable)
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
          this.master.granja.getAllEspacios(this.DataForm.empresa['IDEMP'],this.DataForm.granja['IDGRA']).then((Data)=>{
            if(!Data['correcto']){
              if(Data['data']['status']==-1){
                this.espacios=[]
                this.portComponent.close();
                this.master.toastMensaje("No tienes internets",2000)
              }else{
                this.espacios=[]
                this.portComponent.close();
                this.master.toastMensaje("No se pudo extraer informacion",2000)
              }
            }else{
              if(Data['data']['espacios'].length>0){
                this.espacios=Data['data']['espacios']
              }else{
                this.master.toastMensaje("No hay informacion",2000)
                this.espacios=[]
                this.portComponent.close();
              }
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
