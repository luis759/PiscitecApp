import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { MenuPage } from '../menu/menu.page';
import { ReportdetallePage } from '../modals/reportdetalle/reportdetalle.page';
import { ReportsaldoPage } from '../modals/reportsaldo/reportsaldo.page';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-reportinicial',
  templateUrl: './reportinicial.page.html',
  styleUrls: ['./reportinicial.page.scss'],
})
export class ReportinicialPage implements OnInit {
  @ViewChild('portComponent') portComponent: IonicSelectableComponent;
  DataForm={
    Lote:{
      value:''
    },
    TipoReporte:{
      value:''
    },
    observacion:{
      value:''
    },
    anexo:{
      value:''
    },
    fecha:new Date().toString(),
    empresa:null,
    granja:null,
    espacio:null,
    responsable:null
  }
  Pesos={
    Promedio:0,
    Aritemitico:0
  }
  saldoss=[]
  empresas=[]
  granjas=[]
  espacios=[]
  responsables=[]
  detalles=[]
  
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,private navcontroll:NavController,private menu:MenuPage) { }
  changeResponsable(evento){
    
  }
  changeLotes(evento){
    if(evento.value['LOTE']){
      this.DataForm.Lote.value=evento.value['LOTE']

    }else{
      this.DataForm.Lote.value='0'
    }
  }
  ngOnInit() {
    this.menu.activarmenuDesactivar(false);
    this.master.storage.getItems(this.master.storage.arrayname.Empresas).then((Empresass)=>{
      console.log(Empresass)
       if(Empresass){
        this.empresas=Empresass[0]
       }else{
        this.empresas=[]
       }
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
  limpiarData(){
    this.saldoss=[];
    this.detalles=[];
    this.DataForm={
      Lote:{
        value:''
      },
      TipoReporte:{
        value:''
      },
      observacion:{
        value:''
      },
      anexo:{
        value:''
      },
      fecha:new Date().toString(),
      empresa:null,
      espacio:null,
      granja:null,
      responsable:null
    }
    this.Pesos={
      Promedio:0,
      Aritemitico:0
    }
  }
  ngOnDestroy() {
    this.menu.activarmenuDesactivar(true);
  }
  ValidarRegistro(){
      if(this.saldoss.length>0){
        if(this.DataForm.empresa){
          if(this.DataForm.granja){
            if(this.DataForm.responsable){
              if(this.DataForm.TipoReporte.value){
                    if(this.DataForm.Lote.value){
                          if(parseFloat(this.DataForm.Lote.value)>0){
                              if(this.detalles.length>0){
                                this.seguir()
                              }else{
                                this.master.MensajeAlert("Debes colocar un detalle al menos","Reporte Inicial")
                              }
                            
                          }else{
                            this.master.MensajeAlert("Lote debe ser mayor a 0","Reporte Inicial")
                          }
                    }else{
                      this.master.MensajeAlert("Debe colocar al menos un Lote","Reporte Inicial")
                    }
              }else{
                this.master.MensajeAlert("Debe seleccionar un Tipo de Reporte","Reporte Inicial")
              }
            }else{  
              this.master.MensajeAlert("Debe seleccionar un responsable","Reporte Inicial")
            }
          }else{
            this.master.MensajeAlert("Debe seleccionar una granja","Reporte Inicial")
          }
        }else{
          this.master.MensajeAlert("Debe seleccionar una empresa","Reporte Inicial")
        }
      }else{
        this.master.MensajeAlert("Debe Colocar al menos un Detalle de Saldo","Reporte Inicial")
      }
  }
  seguir(){
    this.master.Load(this.loadingController).then(()=>{
      this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((Usuario)=>{
        let id=Usuario[0]['Cedula']
        let valor=this.master.reportes.Reporte
        valor.FECHA=formatDate(new  Date(this.DataForm.fecha) , 'yyyy-MM-dd', 'en')
        valor.IDEMP=this.DataForm.empresa['IDEMP']
        valor.IDGRA=this.DataForm.granja['IDGRA']
        valor.LOTE=this.DataForm.Lote.value
        valor.OBSERVA=this.DataForm.observacion.value
        valor.RESPONSABLE=this.DataForm.responsable['COD']
        valor.saldojson=JSON.stringify(this.saldoss)
        valor.TIPO=this.DataForm.TipoReporte.value
        valor.USUARIO=id
        valor.detalljson=JSON.stringify(this.detalles)
          this.master.reportes.postNewReporte(valor).then((ReporteIngreso)=>{
            let ReporteGen=this.master.storage.reportesGenerado
            ReporteGen.ReporteDetalle=this.detalles
            ReporteGen.ReporteInicial=valor
            ReporteGen.enviado=false
            if(!ReporteIngreso['correcto'] && ReporteIngreso['data']['status']==-1){
              this.GuardarRegistroDeReportes(ReporteGen,false,false)
              this.loadingController.dismiss()
            }else{
              if(ReporteIngreso['correcto']){
                ReporteGen.dataEnviado=ReporteIngreso['data']
                ReporteGen.enviado=true
                this.GuardarRegistroDeReportes(ReporteGen,true,false)
                this.loadingController.dismiss()
              }else if(ReporteIngreso['correcto'] && ReporteIngreso['mensaje']=="errorapi"){ 
                ReporteGen.enviado=true
                ReporteGen.dataEnviado=ReporteIngreso['data']
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
  GuardarRegistroDeReportes(Report,Enviado,Erroes){
    this.master.storage.getItems(this.master.storage.arrayname.ReporteGenerados).then((Info)=>{
      let Registros=[]
      if(Info){
       Registros=Info[0]
      }
      this.master.storage.DeleteKey(this.master.storage.arrayname.ReporteGenerados).then(()=>{
        let array=Registros
        let valor=array.push(Report)
        this.master.storage.addItem(this.master.storage.arrayname.ReporteGenerados,array).then(()=>{
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
  gotoDetalle(){
    this.irParaDetalles(this.detalles,this.DataForm.empresa['IDEMP'],this.DataForm.granja['IDGRA'])
  }
  async irParaDetalles(data,IDEMPRESA,IDGRANJA){
    const modal=await this.modalController.create({
      component:ReportdetallePage,
      componentProps:{
        detalles:data,
        idEmpresa:IDEMPRESA,
        idGranja:IDGRANJA
      }
    });
    modal.onDidDismiss().then((detalles)=>{
      if(detalles.data){
        this.detalles=detalles.data 
        this.getPesoPromedioyPonderado()
      }else{
        this.master.storage.getItems(this.master.storage.arrayname.DetallePrueb).then((data)=>{
          this.detalles=data[0]
          this.getPesoPromedioyPonderado()
        })
      }
    })
    return await modal.present()
  }
  gotoSaldos(){
    this.irParaSaldos(this.saldoss)
  }
  async irParaSaldos(data){
    const modal=await this.modalController.create({
      component:ReportsaldoPage,
      componentProps:{
        saldos:data
      }
    });
    modal.onDidDismiss().then((Saldos)=>{
      if(Saldos.data){
        this.saldoss=Saldos.data 
      }else{
        this.master.storage.getItems(this.master.storage.arrayname.DetallePrueb).then((data)=>{
          this.saldoss=data[0]
        })
      }
    })
    return await modal.present()
  }
  getPesoPromedioyPonderado(){
    let sumaPesosTotales=0
    let sumacantidadAnimales=0
    let sumaPesoPromedio=0
    for(let i=0;i<this.detalles.length;i++){ 
      sumaPesoPromedio=parseFloat(this.detalles[i]['pesoprom'])+sumaPesoPromedio
      sumaPesosTotales=parseFloat(this.detalles[i]['pesototal'].toString())+sumaPesosTotales
      sumacantidadAnimales=parseFloat(this.detalles[i]['CantidadAnimales'].toString())+sumacantidadAnimales
    }
    if(this.detalles.length>0){
      this.Pesos.Aritemitico=Math.round((sumaPesoPromedio/this.detalles.length)*100)/100
      this.Pesos.Promedio=Math.round((sumaPesosTotales/sumacantidadAnimales)*100)/100
      console.log( this.Pesos)
    }else{
      this.Pesos.Aritemitico=0
      this.Pesos.Promedio=0
    }
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
  pruebas(){

  }
}
