import { Component, NgZone, OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-report-send',
  templateUrl: './report-send.page.html',
  styleUrls: ['./report-send.page.scss'],
})
export class ReportSendPage implements OnInit {
  messageLocal=[]
  messageHome=[]
  reportes=[]
  Empresas=[]
  Granjas=[]
  espacios=[]
  Responsables=[]
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
          if(Extraccion[i]['enviado']){
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
            if(Extraccion[i]['enviado']){
              let agregar=array.push({Reporte:Extraccion[i],numero:i,nameReporte:this.messageHome['option2'],idReporte:2})
            } 
          }
          this.master.storage.getItems(this.master.storage.arrayname.FisiscosQuimicosRep).then((Data)=>{
            let Extraccion=[]
            if(Data){
              Extraccion=Data[0]
            }
  
            for(var i=0;i<Extraccion.length;i++){
              if(Extraccion[i]['enviado']){
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
                if(Extraccion[i]['enviado']){
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
                  if(Extraccion[i]['enviado']){
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
}
