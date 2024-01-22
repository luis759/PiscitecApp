import { Component, NgZone, OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-report-save',
  templateUrl: './report-save.page.html',
  styleUrls: ['./report-save.page.scss'],
})
export class ReportSavePage implements OnInit {
messageLocal=[]
messageHome=[]
reportes=[]
Empresas=[]
Granjas=[]
espacios=[]
Responsables=[]
enviado={
  limite:0,
  cantidad:0
}
  constructor(private master:MasterService,private translate:TranslateService,
    private loadingController:LoadingController,private  ngZone:NgZone) { }

  ngOnInit() {
    this.translate.get("reportsave").subscribe(dataTranslate=>{
      this.messageLocal=dataTranslate
     })
     this.translate.get("home").subscribe(dataTranslate=>{
      this.messageHome=dataTranslate
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
    this.master.storage.getItems(this.master.storage.arrayname.EspaciosByCod).then((datosEspacios)=>{
      console.log(datosEspacios)
      if(datosEspacios){
        this.espacios=datosEspacios[0]
      }
    })
    this.extraerDatos()
  }
  extraerDatos(){
    let array=[]
    this.master.storage.getItems(this.master.storage.arrayname.ReporteGenerados).then((Data)=>{
      let Extraccion=[]
      if(Data){
        Extraccion=Data[0]
      }
      for(var i=0;i<Extraccion.length;i++){
        if(!Extraccion[i]['enviado']){
          let sumacantidadAnimales=0;
          let sumaPesosTotales=0;
          let Espacio=""
          if(Extraccion[i].ReporteInicial.IDESPACIO){
            Espacio=Extraccion[i].ReporteInicial.IDESPACIO
          }else{
            let DatoJson=JSON.parse(Extraccion[i].ReporteInicial.saldojson)
            if(DatoJson.length>0){
              Espacio=DatoJson[0].especie.IDESP
            }
          }
          for(let k=0;k<Extraccion[i].ReporteDetalle.length;k++){ 
            sumaPesosTotales=parseFloat(Extraccion[i].ReporteDetalle[k]['pesototal'].toString())+sumaPesosTotales
            sumacantidadAnimales=parseFloat(Extraccion[i].ReporteDetalle[k]['CantidadAnimales'].toString())+sumacantidadAnimales
          }
          let peso=Math.round((sumaPesosTotales/sumacantidadAnimales)*100)/100
          let agregar=array.push({Reporte:Extraccion[i],numero:i,nameReporte:this.messageHome['option1'],idReporte:1,promedio:peso,codigoEspacio:Espacio})
        }
      }
      this.master.storage.getItems(this.master.storage.arrayname.VacunaReporte).then((Data)=>{
        let Extraccion=[]
        if(Data){
          Extraccion=Data[0]
        }
        for(var i=0;i<Extraccion.length;i++){
          if(!Extraccion[i]['enviado']){
            let agregar=array.push({Reporte:Extraccion[i],numero:i,nameReporte:this.messageHome['option2'],idReporte:2})
          } 
        }
        this.master.storage.getItems(this.master.storage.arrayname.FisiscosQuimicosRep).then((Data)=>{
          let Extraccion=[]
          if(Data){
            Extraccion=Data[0]
          }

          for(var i=0;i<Extraccion.length;i++){
            if(!Extraccion[i]['enviado']){
              let variable=JSON.parse(Extraccion[i].ReporteInicial.detallejson).length
              let agregar=array.push({Reporte:Extraccion[i],numero:i,nameReporte:this.messageHome['option4'],idReporte:3,variable:variable,codigoEspacio:Extraccion[i].ReporteInicial.IDESPA})
            }
          }
          this.master.storage.getItems(this.master.storage.arrayname.repConsumos).then((Data)=>{
            let Extraccion=[]
            if(Data){
              Extraccion=Data[0]
            }
            for(var i=0;i<Extraccion.length;i++){
              if(!Extraccion[i]['enviado']){
                let cantidad=0
                let lote=JSON.parse(Extraccion[i].ReporteInicial.detallejson).length
                JSON.parse(Extraccion[i].ReporteInicial.detallejson).forEach((valorList)=>{
                  cantidad=cantidad+parseFloat(valorList.CANTIDAD)
                })
                let agregar=array.push({Reporte:Extraccion[i],numero:i,nameReporte:this.messageHome['optionoth1'],idReporte:5,cantidad:cantidad,lote:lote})
              }
            }
            this.master.storage.getItems(this.master.storage.arrayname.repMortalidd).then((Data)=>{
              let Extraccion=[]
              if(Data){
                Extraccion=Data[0]
              }
              for(var i=0;i<Extraccion.length;i++){
                if(!Extraccion[i]['enviado']){
                  let cantidad=0
                  let lote=0
                  JSON.parse(Extraccion[i].ReporteInicial.detallejson).forEach((valorList)=>{
                    cantidad=cantidad+((valorList.CANTAM*1)+(valorList.CANTPM*1))
                    lote=lote+((valorList.KILOSAM*1)+(valorList.KILOSPM*1))
                  })

                  let agregar=array.push({Reporte:Extraccion[i],numero:i,nameReporte:this.messageHome['option3'],idReporte:4,cantidad:cantidad,lote:lote})
                }
              }
              this.agregarNombreEmpresasGranjasRespon(array)
            })
          })
        })
      })
    })
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
      for(var f=0;f<this.espacios.length;f++){
        if(arrays[i]['codigoEspacio']){
          if((this.espacios[f]['COD']==arrays[i]['codigoEspacio']) &&(this.espacios[f]['IDGRA']==arrays[i]['Reporte']['ReporteInicial']['IDGRA']) && (this.espacios[f]['IDEMP']==arrays[i]['Reporte']['ReporteInicial']['IDEMP']) ){
            arrays[i]['EspacioNombre']=this.espacios[f]['NOMBRE']
          }
        }
    
      }
    }
      this.reportes=arrays
    }
    enviar(){
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
      console.log(this.reportes)
      if(this.reportes[i].idReporte==1){
          this.enviarReportesTipo1(i,valor)
      }else if(this.reportes[i].idReporte==2){
        this.enviarReportesTipo2(i,valor)
      }else if(this.reportes[i].idReporte==3){
        this.enviarReportesTipo3(i,valor)
      }else if(this.reportes[i].idReporte==4){
        this.enviarReportesTipo4(i,valor)
      }else if(this.reportes[i].idReporte==5){
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
    this.enviado.limite=this.reportes.length
    this.enviado.cantidad=0
   if(this.enviado.cantidad<this.enviado.limite){
    this.guardarCadaUno()
   }
 
  }
  guardarCadaUno(){
    if(this.enviado.cantidad<this.enviado.limite){
      if(this.reportes[this.enviado.cantidad].idReporte==1){
        this.guardartipo1(this.enviado.cantidad)
        }else if(this.reportes[this.enviado.cantidad].idReporte==2){
          this.guardartipo2(this.enviado.cantidad)
        }else if(this.reportes[this.enviado.cantidad].idReporte==3){
          this.guardartipo3(this.enviado.cantidad)
        }else if(this.reportes[this.enviado.cantidad].idReporte==4){
          this.guardartipo4(this.enviado.cantidad)
        }else if(this.reportes[this.enviado.cantidad].idReporte==5){
          this.guardartipo5(this.enviado.cantidad)
        }
    }else{
      this.finalizado()
    }
    
  }
  finalizado(){
    this.loadingController.dismiss().finally(()=>{
      this.master.MensajeAlert(this.messageLocal['enviadoreportes'],this.messageLocal['enviadotitle'])
      this.extraerDatos()
    })
  }
  guardartipo1(i){
    this.master.storage.getItems(this.master.storage.arrayname.ReporteGenerados).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
          ReportesGlobales[this.reportes[i]['numero']]=this.reportes[i]['Reporte']
        this.master.storage.DeleteKey(this.master.storage.arrayname.ReporteGenerados).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.ReporteGenerados,ReportesGlobales).then(()=>{
            this.enviado.cantidad=this.enviado.cantidad+1;
            this.guardarCadaUno()
          })
        })
      }
    })
  }
  guardartipo2(i){
    this.master.storage.getItems(this.master.storage.arrayname.VacunaReporte).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        ReportesGlobales[this.reportes[i]['numero']]=this.reportes[i]['Reporte']
        this.master.storage.DeleteKey(this.master.storage.arrayname.VacunaReporte).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.VacunaReporte,ReportesGlobales).then(()=>{
            this.enviado.cantidad=this.enviado.cantidad+1;
            this.guardarCadaUno()
          })
        })
      }
    })
  }
  guardartipo3(i){
    this.master.storage.getItems(this.master.storage.arrayname.FisiscosQuimicosRep).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        ReportesGlobales[this.reportes[i]['numero']]=this.reportes[i]['Reporte']
        this.master.storage.DeleteKey(this.master.storage.arrayname.FisiscosQuimicosRep).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.FisiscosQuimicosRep,ReportesGlobales).then(()=>{
            this.enviado.cantidad=this.enviado.cantidad+1;
            this.guardarCadaUno()
          })
        })
      }
    })
  }
  guardartipo4(i){
    this.master.storage.getItems(this.master.storage.arrayname.repMortalidd).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        ReportesGlobales[this.reportes[i]['numero']]=this.reportes[i]['Reporte']
        this.master.storage.DeleteKey(this.master.storage.arrayname.repMortalidd).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.repMortalidd,ReportesGlobales).then(()=>{
            this.enviado.cantidad=this.enviado.cantidad+1;
            this.guardarCadaUno()
          })
        })
      }
    })
  }
  guardartipo5(i){
    this.master.storage.getItems(this.master.storage.arrayname.repConsumos).then((DataReportes)=>{
      if(DataReportes){
        let ReportesGlobales=DataReportes[0]
        ReportesGlobales[this.reportes[i]['numero']]=this.reportes[i]['Reporte']
        this.master.storage.DeleteKey(this.master.storage.arrayname.repConsumos).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.repConsumos,ReportesGlobales).then(()=>{
            this.enviado.cantidad=this.enviado.cantidad+1;
            this.guardarCadaUno()
          })
        })
      }
    })
  }
}
