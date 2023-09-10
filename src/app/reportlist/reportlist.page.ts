import { Component, NgZone, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MasterService } from '../services/master.service';
import { TranslateService } from '@ngx-translate/core';

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
  message=[]
  constructor(private master:MasterService,private translate:TranslateService,
    private loadingController:LoadingController,private  ngZone:NgZone) { }
  seleccionartiporeporte(evento){
    this.ngZone.run(()=>{
      this.tipodereporte=evento.detail.value
      this.segmentChanged({detail:{value:this.tipo}})
    
    })
  }
  ngOnInit() {
    this.translate.get("reportlist").subscribe(dataTranslate=>{
      this.message=dataTranslate
     })
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
  }else if(this.tipodereporte==3){
    this.master.storage.getItems(this.master.storage.arrayname.FisiscosQuimicosRep).then((Data)=>{
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
  }else if(this.tipodereporte==5){
    this.master.storage.getItems(this.master.storage.arrayname.repConsumos).then((Data)=>{
      console.log(Data)
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
  }else if(this.tipodereporte==4){
    this.master.storage.getItems(this.master.storage.arrayname.repMortalidd).then((Data)=>{
      console.log(Data)
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

  enviarDataTodasTipo1(){
    this.master.Load(this.loadingController).then(()=>{
      this.master.storage.getItems(this.master.storage.arrayname.ReporteGenerados).then((Data)=>{
        let Extraccion=[]
        let array=[]
        if(Data){
          Extraccion=Data[0]
        }
        for(var i=0;i<Extraccion.length;i++){
          if(!Extraccion[i]['enviado']){
            let agregar=array.push({Reporte:Extraccion[i],numero:i})
          }
        }
        if(array.length>0){
          this.enviarReportesTodoTipo1(0,array)
        }else{
          this.enviarDatatodastipo2()
        }
      })
    })
  }
  enviarDatatodastipo2(){
    this.master.storage.getItems(this.master.storage.arrayname.VacunaReporte).then((Data)=>{
      let Extraccion=[]
      let array=[]
      if(Data){
        Extraccion=Data[0]
      }
      for(var i=0;i<Extraccion.length;i++){
        if(!Extraccion[i]['enviado']){
          let agregar=array.push({Reporte:Extraccion[i],numero:i})
        } 
      }

      if(array.length>0){
        this.enviarReportestodoTipo2(0,array)

      }else{
        this.enviarDatatodastipo3()
      }

    })
  }
  enviarDatatodastipo3(){
    this.master.storage.getItems(this.master.storage.arrayname.FisiscosQuimicosRep).then((Data)=>{
      let Extraccion=[]
      let array=[]
      if(Data){
        Extraccion=Data[0]
      }
      for(var i=0;i<Extraccion.length;i++){
        if(!Extraccion[i]['enviado']){
          let agregar=array.push({Reporte:Extraccion[i],numero:i})
        }
      }
      if(array.length>0){
        this.enviarReportestodoTipo3(0,array)
      }else{
        this.enviarDatatodastipo4()
      }
    })
  }
  enviarDatatodastipo4(){
    this.master.storage.getItems(this.master.storage.arrayname.repMortalidd).then((Data)=>{
      let Extraccion=[]
      let array=[]
      if(Data){
        Extraccion=Data[0]
      }
      for(var i=0;i<Extraccion.length;i++){
        if(!Extraccion[i]['enviado']){
          let agregar=array.push({Reporte:Extraccion[i],numero:i})
        }
      }
      if(array.length>0){
        this.enviarReportestodoTipo4(0,array)
      }else{
        this.enviarDatatodastipo5()
      }
    })
  }
  enviarDatatodastipo5(){
    this.master.storage.getItems(this.master.storage.arrayname.repConsumos).then((Data)=>{
      let array=[]
      let Extraccion=[]
      if(Data){
        Extraccion=Data[0]
      }
      for(var i=0;i<Extraccion.length;i++){
        if(!Extraccion[i]['enviado']){
          let agregar=array.push({Reporte:Extraccion[i],numero:i})
        }
      }
      if(array.length>0){
        this.enviarReportestodoTipo5(0,array)
      }else{
        
        this.segmentChanged({detail:{value:this.tipo}})
        this.master.MensajeAlert(this.message['enviadoreportes'],this.message['enviadotitle'])
        this.loadingController.dismiss()
      }
    })
  }
  enviarReportesTodoTipo1(i,arreglo){
    let valor=this.master.storage.reportesGenerado
    valor=arreglo[i]['Reporte']['ReporteInicial']
    this.master.reportes.postNewReporte(valor).then((ReporteIngreso)=>{
      if(!ReporteIngreso['correcto'] && ReporteIngreso['data']['status']==-1){
        arreglo[i]['Reporte']['enviado']=false
      }else{
        if(ReporteIngreso['correcto']){
          arreglo[i]['Reporte']['dataEnviado']=ReporteIngreso['data']
          arreglo[i]['Reporte']['enviado']=true
        }else if(ReporteIngreso['correcto'] && ReporteIngreso['mensaje']=="errorapi"){ 
          arreglo[i]['Reporte']['dataEnviado']=ReporteIngreso['data']
          arreglo[i]['Reporte']['enviado']=true
        }else{
          arreglo[i]['Reporte']['enviado']=false
        }
      }
      let cantidad=i+1
      if(cantidad<arreglo.length){
        this.enviarReportesTodoTipo1(cantidad,arreglo)
      }else{
        this.GuardarRegistrosDeReportes()
      }
    })
  }
  guardartodotipo1(arreglo){
    this.master.storage.getItems(this.master.storage.arrayname.ReporteGenerados).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        for(var i=0;i<arreglo.length;i++){
            ReportesGlobales[arreglo[i]['numero']]=arreglo[i]['Reporte']
        }
        this.master.storage.DeleteKey(this.master.storage.arrayname.ReporteGenerados).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.ReporteGenerados,ReportesGlobales).then(()=>{
            this.enviarDatatodastipo2()
          })
        })
      }else{
        this.enviarDatatodastipo2()
      }
    })
  }
  
  enviarReportestodoTipo2(i,arreglo){
    let valor=this.master.storage.reportesGenerado
    valor=arreglo[i]['Reporte']['ReporteInicial']
    this.master.vacunas.postNewVacunas(valor).then((NewVacunas)=>{
      if(!NewVacunas['correcto'] && NewVacunas['data']['status']==-1){
        arreglo[i]['Reporte']['enviado']=false
      }else{
        if(NewVacunas['correcto']){
          arreglo[i]['Reporte']['dataEnviado']=NewVacunas['data']
          arreglo[i]['Reporte']['enviado']=true
        }else if(NewVacunas['correcto'] && NewVacunas['mensaje']=="errorapi"){ 
          arreglo[i]['Reporte']['dataEnviado']=NewVacunas['data']
          arreglo[i]['Reporte']['enviado']=true
        }else{
          arreglo[i]['Reporte']['enviado']=false
        }
      }
      let cantidad=i+1
      if(cantidad<arreglo.length){
        this.enviarReportestodoTipo2(cantidad,arreglo)
      }else{
        this.guardartodotipo2(arreglo)
      }
    })
  }
  guardartodotipo2(arreglo){
    this.master.storage.getItems(this.master.storage.arrayname.VacunaReporte).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        for(var i=0;i<arreglo.length;i++){
            ReportesGlobales[arreglo[i]['numero']]=arreglo[i]['Reporte']
        }
        this.master.storage.DeleteKey(this.master.storage.arrayname.VacunaReporte).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.VacunaReporte,ReportesGlobales).then(()=>{
            this.enviarDatatodastipo3()
          })
        })
      }else{
        this.enviarDatatodastipo3()
      }
    })
  }
  enviarReportestodoTipo3(i,arreglo){
    let valor=this.master.storage.reportesGenerado
    valor=arreglo[i]['Reporte']['ReporteInicial']
    this.master.fisicoquimicos.postNewFisicoQuimicos(valor).then((Newfisicoquimicos)=>{
      if(!Newfisicoquimicos['correcto'] && Newfisicoquimicos['data']['status']==-1){
        arreglo[i]['Reporte']['enviado']=false
      }else{
        if(Newfisicoquimicos['correcto']){
          arreglo[i]['Reporte']['dataEnviado']=Newfisicoquimicos['data']
          arreglo[i]['Reporte']['enviado']=true
        }else if(Newfisicoquimicos['correcto'] && Newfisicoquimicos['mensaje']=="errorapi"){ 
          arreglo[i]['Reporte']['dataEnviado']=Newfisicoquimicos['data']
          arreglo[i]['Reporte']['enviado']=true
        }else{
          arreglo[i]['Reporte']['enviado']=false
        }
      }
     let cantidad=i+1
      if(cantidad<arreglo.length){
        this.enviarReportestodoTipo3(cantidad,arreglo)
      }else{
        this.GuardarRegistrosDeReportes()
      }
    })
  }
  guardartodotipo3(arreglo){
    this.master.storage.getItems(this.master.storage.arrayname.FisiscosQuimicosRep).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        for(var i=0;i<arreglo.length;i++){
            ReportesGlobales[arreglo[i]['numero']]=arreglo[i]['Reporte']
        }
        this.master.storage.DeleteKey(this.master.storage.arrayname.FisiscosQuimicosRep).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.FisiscosQuimicosRep,ReportesGlobales).then(()=>{
            this.enviarDatatodastipo4()
          })
        })
      }else{
        this.enviarDatatodastipo4()
      }
    })
  }
  enviarReportestodoTipo4(i,arreglo){
    let valor=this.master.storage.reportesGenerado
    valor=arreglo[i]['Reporte']['ReporteInicial']
    this.master.mortalidadt.postnewregistromortalidad(valor).then((NewMortalidad)=>{
      if(!NewMortalidad['correcto'] && NewMortalidad['data']['status']==-1){
        arreglo[i]['Reporte']['enviado']=false
      }else{
        if(NewMortalidad['correcto']){
          arreglo[i]['Reporte']['dataEnviado']=NewMortalidad['data']
          arreglo[i]['Reporte']['enviado']=true
        }else if(NewMortalidad['correcto'] && NewMortalidad['mensaje']=="errorapi"){ 
          arreglo[i]['Reporte']['dataEnviado']=NewMortalidad['data']
          arreglo[i]['Reporte']['enviado']=true
        }else{
          arreglo[i]['Reporte']['enviado']=false
        }
      }
      let cantidad=i+1
      if(cantidad<arreglo.limite){
        this.enviarReportestodoTipo4(cantidad,arreglo)
      }else{
        this.GuardarRegistrosDeReportes()
      }
    })
  }
  guardartodotipo4(arreglo){
    this.master.storage.getItems(this.master.storage.arrayname.repMortalidd).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        for(var i=0;i<arreglo.length;i++){
            ReportesGlobales[arreglo[i]['numero']]=arreglo[i]['Reporte']
        }
        this.master.storage.DeleteKey(this.master.storage.arrayname.repMortalidd).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.repMortalidd,ReportesGlobales).then(()=>{
            this.enviarDatatodastipo5()
          })
        })
      }else{
        this.enviarDatatodastipo5()
      }
    })
  }
  
  enviarReportestodoTipo5(i,arreglo){
    let valor=this.master.storage.reportesGenerado
    valor=arreglo[i]['Reporte']['ReporteInicial']
    this.master.consumos.postnewregistroconsumos(valor).then((NewConsumos)=>{
      if(!NewConsumos['correcto'] && NewConsumos['data']['status']==-1){
        arreglo[i]['Reporte']['enviado']=false
      }else{
        if(NewConsumos['correcto']){
          arreglo[i]['Reporte']['dataEnviado']=NewConsumos['data']
          arreglo[i]['Reporte']['enviado']=true
        }else if(NewConsumos['correcto'] && NewConsumos['mensaje']=="errorapi"){ 
          arreglo[i]['Reporte']['dataEnviado']=NewConsumos['data']
          arreglo[i]['Reporte']['enviado']=true
        }else{
          arreglo[i]['Reporte']['enviado']=false
        }
      }
      let cantidad=i+1
      if(cantidad<arreglo.limite){
        this.enviarReportestodoTipo5(cantidad,arreglo)
      }else{
        this.GuardarRegistrosDeReportes()
      }
    })
  }
  guardartodotipo5(arreglo){
    this.master.storage.getItems(this.master.storage.arrayname.repConsumos).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        for(var i=0;i<arreglo.length;i++){
            ReportesGlobales[arreglo[i]['numero']]=arreglo[i]['Reporte']
        }
        this.master.storage.DeleteKey(this.master.storage.arrayname.repConsumos).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.repConsumos,ReportesGlobales).then(()=>{
            this.loadingController.dismiss().finally(()=>{
              this.segmentChanged({detail:{value:this.tipo}})
              this.master.MensajeAlert(this.message['enviadoreportes'],this.message['enviadotitle'])
            })
          })
        })
      }else{
        this.loadingController.dismiss()
      }
    })
  }
  // ENVIOS TODOS
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
    }else if(this.tipodereporte==3){
      this.enviarReportesTipo3(i,valor)
    }else if(this.tipodereporte==4){
      this.enviarReportesTipo4(i,valor)
    }else if(this.tipodereporte==5){
      this.enviarReportesTipo5(i,valor)
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
  enviarReportesTipo3(i,valor){
    valor=this.reportes[i]['Reporte']['ReporteInicial']
    this.master.fisicoquimicos.postNewFisicoQuimicos(valor).then((Newfisicoquimicos)=>{
      if(!Newfisicoquimicos['correcto'] && Newfisicoquimicos['data']['status']==-1){
        this.reportes[i]['Reporte']['enviado']=false
      }else{
        if(Newfisicoquimicos['correcto']){
          this.reportes[i]['Reporte']['dataEnviado']=Newfisicoquimicos['data']
          this.reportes[i]['Reporte']['enviado']=true
        }else if(Newfisicoquimicos['correcto'] && Newfisicoquimicos['mensaje']=="errorapi"){ 
          this.reportes[i]['Reporte']['dataEnviado']=Newfisicoquimicos['data']
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
  enviarReportesTipo4(i,valor){
    valor=this.reportes[i]['Reporte']['ReporteInicial']
    this.master.mortalidadt.postnewregistromortalidad(valor).then((NewMortalidad)=>{
      if(!NewMortalidad['correcto'] && NewMortalidad['data']['status']==-1){
        this.reportes[i]['Reporte']['enviado']=false
      }else{
        if(NewMortalidad['correcto']){
          this.reportes[i]['Reporte']['dataEnviado']=NewMortalidad['data']
          this.reportes[i]['Reporte']['enviado']=true
        }else if(NewMortalidad['correcto'] && NewMortalidad['mensaje']=="errorapi"){ 
          this.reportes[i]['Reporte']['dataEnviado']=NewMortalidad['data']
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
  enviarReportesTipo5(i,valor){
    valor=this.reportes[i]['Reporte']['ReporteInicial']
    this.master.consumos.postnewregistroconsumos(valor).then((NewConsumos)=>{
      if(!NewConsumos['correcto'] && NewConsumos['data']['status']==-1){
        this.reportes[i]['Reporte']['enviado']=false
      }else{
        if(NewConsumos['correcto']){
          this.reportes[i]['Reporte']['dataEnviado']=NewConsumos['data']
          this.reportes[i]['Reporte']['enviado']=true
        }else if(NewConsumos['correcto'] && NewConsumos['mensaje']=="errorapi"){ 
          this.reportes[i]['Reporte']['dataEnviado']=NewConsumos['data']
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
    }else if(this.tipodereporte==3){
      this.guardartipo3()
      }else if(this.tipodereporte==4){
        this.guardartipo4()
        }else if(this.tipodereporte==5){
          this.guardartipo5()
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
              this.master.MensajeAlert(this.message['enviadoreportes'],this.message['enviadotitle'])
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
              this.master.MensajeAlert(this.message['enviadoreportes'],this.message['enviadotitle'])
            })
          })
        })
      }else{
        this.loadingController.dismiss()
      }
    })
  }
  guardartipo3(){
    this.master.storage.getItems(this.master.storage.arrayname.FisiscosQuimicosRep).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        for(var i=0;i<this.reportes.length;i++){
            ReportesGlobales[this.reportes[i]['numero']]=this.reportes[i]['Reporte']
        }
        this.master.storage.DeleteKey(this.master.storage.arrayname.FisiscosQuimicosRep).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.FisiscosQuimicosRep,ReportesGlobales).then(()=>{
            this.loadingController.dismiss().finally(()=>{
              this.segmentChanged({detail:{value:this.tipo}})
              this.master.MensajeAlert(this.message['enviadoreportes'],this.message['enviadotitle'])
            })
          })
        })
      }else{
        this.loadingController.dismiss()
      }
    })
  }
  guardartipo4(){
    this.master.storage.getItems(this.master.storage.arrayname.repMortalidd).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        for(var i=0;i<this.reportes.length;i++){
            ReportesGlobales[this.reportes[i]['numero']]=this.reportes[i]['Reporte']
        }
        this.master.storage.DeleteKey(this.master.storage.arrayname.repMortalidd).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.repMortalidd,ReportesGlobales).then(()=>{
            this.loadingController.dismiss().finally(()=>{
              this.segmentChanged({detail:{value:this.tipo}})
              this.master.MensajeAlert(this.message['enviadoreportes'],this.message['enviadotitle'])
            })
          })
        })
      }else{
        this.loadingController.dismiss()
      }
    })
  }
  guardartipo5(){
    this.master.storage.getItems(this.master.storage.arrayname.repConsumos).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        for(var i=0;i<this.reportes.length;i++){
            ReportesGlobales[this.reportes[i]['numero']]=this.reportes[i]['Reporte']
        }
        this.master.storage.DeleteKey(this.master.storage.arrayname.repConsumos).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.repConsumos,ReportesGlobales).then(()=>{
            this.loadingController.dismiss().finally(()=>{
              this.segmentChanged({detail:{value:this.tipo}})
              this.master.MensajeAlert(this.message['enviadoreportes'],this.message['enviadotitle'])
            })
          })
        })
      }else{
        this.loadingController.dismiss()
      }
    })
  }
}
