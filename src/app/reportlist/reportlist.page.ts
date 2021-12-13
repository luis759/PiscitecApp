import { Component, NgZone, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-reportlist',
  templateUrl: './reportlist.page.html',
  styleUrls: ['./reportlist.page.scss'],
})
export class ReportlistPage implements OnInit {
  tipo="Send"
  reportes=[]
  Empresas=[]
  Granjas=[]
  Responsables=[]
  enviado={
    limite:0,
    cantidad:0
  };
  tipodereporte=1
  constructor(private master:MasterService,private loadingController:LoadingController,private  ngZone:NgZone) { }
  seleccionartiporeporte(evento){
    this.ngZone.run(()=>{
      this.tipodereporte=evento.detail.value
      this.segmentChanged({detail:{value:this.tipo}})
    
    })
  }
  ngOnInit() {
    this.master.storage.getItems(this.master.storage.arrayname.Empresas).then((Empresas)=>{
      if(Empresas){
        this.Empresas=Empresas[0]
      }
    })
    this.master.storage.getItems(this.master.storage.arrayname.Granjas).then((GRanjas)=>{
      if(GRanjas){
        this.Granjas=GRanjas[0]
      }
    })
    this.master.storage.getItems(this.master.storage.arrayname.Responsables).then((Responsable)=>{
      if(Responsable){
        this.Responsables=Responsable[0]
      }
    })
    this.segmentChanged({detail:{value:this.tipo}})
  }
  segmentChanged(evenot){
  this.tipo=evenot.detail.value
  let array=[]
  if(this.tipodereporte==1){
    this.master.storage.getItems(this.master.storage.arrayname.ReporteGenerados).then((Data)=>{
      let Extraccion=[]
      if(Data){
        Extraccion=Data[0]
      }
      for(var i=0;i<Extraccion.length;i++){
        if(this.tipo=="Send"){
          if(Extraccion[i]['enviado']){
            let agregar=array.push({Reporte:Extraccion[i],numero:i})
          }
        }else{
          if(!Extraccion[i]['enviado']){
            let agregar=array.push({Reporte:Extraccion[i],numero:i})
          }
        } 
      }
     this.agregarNombreEmpresasGranjasRespon(array)
    })
  }else if(this.tipodereporte==2){
    this.master.storage.getItems(this.master.storage.arrayname.VacunaReporte).then((Data)=>{
      let Extraccion=[]
      if(Data){
        Extraccion=Data[0]
      }
      for(var i=0;i<Extraccion.length;i++){
        if(this.tipo=="Send"){
          if(Extraccion[i]['enviado']){
            let agregar=array.push({Reporte:Extraccion[i],numero:i})
          }
        }else{
          if(!Extraccion[i]['enviado']){
            let agregar=array.push({Reporte:Extraccion[i],numero:i})
          }
        } 
      }
     this.agregarNombreEmpresasGranjasRespon(array)
    })
  }
  

  }
  agregarNombreEmpresasGranjasRespon(arrays){
  for(var i=0;i<arrays.length;i++){
    for(var j=0;j<this.Empresas.length;j++){
      if(this.Empresas[j]['IDEMP']==arrays[i]['Reporte']['ReporteInicial']['IDEMP']){
        arrays[i]['NombreEmpresas']=this.Empresas[j]['EMPRESA']
      }
    }
    for(var k=0;k<this.Granjas.length;k++){
      if((this.Granjas[k]['IDGRA']==arrays[i]['Reporte']['ReporteInicial']['IDGRA']) && (this.Granjas[k]['IDEMP']==arrays[i]['Reporte']['ReporteInicial']['IDEMP']) ){
        arrays[i]['GranjasNombre']=this.Granjas[k]['NOMBRE']
      }
    }
    for(var l=0;l<this.Responsables.length;l++){
      if((this.Responsables[l]['COD']==arrays[i]['Reporte']['ReporteInicial']['RESPONSABLE']) &&(this.Responsables[l]['IDGRA']==arrays[i]['Reporte']['ReporteInicial']['IDGRA']) && (this.Responsables[l]['IDEMP']==arrays[i]['Reporte']['ReporteInicial']['IDEMP']) ){
        arrays[i]['Responsablenombre']=this.Responsables[l]['NOMBRES']
      }
    }
  }
    this.reportes=arrays
  }
  enviarData(){
    this.master.Load(this.loadingController).then(()=>{
      this.enviado.limite=this.reportes.length
      this.enviado.cantidad=0
     if(this.enviado.cantidad<this.enviado.limite){
      this.EnviarRegistros(this.enviado.cantidad)
     }
    })
  }
  EnviarRegistros(i){
    
    let valor=this.master.storage.reportesGenerado
    if(this.tipodereporte==1){
        this.enviarReportesTipo1(i,valor)
    }else if(this.tipodereporte==2){
      this.enviarReportesTipo2(i,valor)
    }
  }
  enviarReportesTipo1(i,valor){
    valor=this.reportes[i]['Reporte']['ReporteInicial']
    this.master.reportes.postNewReporte(valor).then((ReporteIngreso)=>{
      if(!ReporteIngreso['correcto'] && ReporteIngreso['data']['status']==-1){
       this.reportes[i]['Reporte']['enviado']=false
      }else{
        if(ReporteIngreso['correcto']){
          this.reportes[i]['Reporte']['dataEnviado']=ReporteIngreso['data']
          this.reportes[i]['Reporte']['enviado']=true
        }else if(ReporteIngreso['correcto'] && ReporteIngreso['mensaje']=="errorapi"){ 
          this.reportes[i]['Reporte']['dataEnviado']=ReporteIngreso['data']
          this.reportes[i]['Reporte']['enviado']=true
        }else{
          this.reportes[i]['Reporte']['enviado']=false
        }
      }
      this.enviado.cantidad=this.enviado.cantidad+1
      if(this.enviado.cantidad<this.enviado.limite){
        this.EnviarRegistros(this.enviado.cantidad)
      }else{
        this.GuardarRegistrosDeReportes()
      }
    })
  }
  enviarReportesTipo2(i,valor){
    valor=this.reportes[i]['Reporte']['ReporteInicial']
    this.master.vacunas.postNewVacunas(valor).then((NewVacunas)=>{
      if(!NewVacunas['correcto'] && NewVacunas['data']['status']==-1){
        this.reportes[i]['Reporte']['enviado']=false
      }else{
        if(NewVacunas['correcto']){
          this.reportes[i]['Reporte']['dataEnviado']=NewVacunas['data']
          this.reportes[i]['Reporte']['enviado']=true
        }else if(NewVacunas['correcto'] && NewVacunas['mensaje']=="errorapi"){ 
          this.reportes[i]['Reporte']['dataEnviado']=NewVacunas['data']
          this.reportes[i]['Reporte']['enviado']=true
        }else{
          this.reportes[i]['Reporte']['enviado']=false
        }
      }
      this.enviado.cantidad=this.enviado.cantidad+1
      if(this.enviado.cantidad<this.enviado.limite){
        this.EnviarRegistros(this.enviado.cantidad)
      }else{
        this.GuardarRegistrosDeReportes()
      }
    })
  }
  GuardarRegistrosDeReportes(){
    this.loadingController.dismiss()
    if(this.tipodereporte==1){
      this.guardartipo1()
  }else if(this.tipodereporte==2){
    this.guardartipo2()
  }
  }
  guardartipo1(){
    this.master.storage.getItems(this.master.storage.arrayname.ReporteGenerados).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        for(var i=0;i<this.reportes.length;i++){
            ReportesGlobales[this.reportes[i]['numero']]=this.reportes[i]['Reporte']
        }
        this.master.storage.DeleteKey(this.master.storage.arrayname.ReporteGenerados).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.ReporteGenerados,ReportesGlobales).then(()=>{
            this.loadingController.dismiss().finally(()=>{
              this.segmentChanged({detail:{value:this.tipo}})
              this.master.MensajeAlert("Enviados los reportes","Mensajes")
            })
          })
        })
      }else{
        this.loadingController.dismiss()
      }
    })
  }
  guardartipo2(){
    this.master.storage.getItems(this.master.storage.arrayname.VacunaReporte).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        for(var i=0;i<this.reportes.length;i++){
            ReportesGlobales[this.reportes[i]['numero']]=this.reportes[i]['Reporte']
        }
        this.master.storage.DeleteKey(this.master.storage.arrayname.VacunaReporte).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.VacunaReporte,ReportesGlobales).then(()=>{
            this.loadingController.dismiss().finally(()=>{
              this.segmentChanged({detail:{value:this.tipo}})
              this.master.MensajeAlert("Enviados los reportes","Mensajes")
            })
          })
        })
      }else{
        this.loadingController.dismiss()
      }
    })
  }
}
