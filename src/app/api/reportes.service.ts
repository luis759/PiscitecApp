import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  Reporte={
    IDEMP:'',
    IDGRA:'',
    LOTE:'',
    FECHA:'',
    saldojson:'',
    TIPO:'',
    ANEXO:'',
    RESPONSABLE:'',
    OBSERVA:'',
    USUARIO:'',
    detalljson:'',
    IDESPACIO:''
  }
  constructor(private httpnative:HTTP) { 

  }
  postNewReporte(Report:any):Promise<any>{
    return new Promise((resolve)=>{
      this.httpnative.setRequestTimeout(60)
      let nativecall=this.httpnative.post(environment.urlApi+'reportes/registro',Report,{'Accept': 'application/json','Content-Type': 'application/json'})
      nativecall.then((Data)=>{
          if(Data.status==200 || Data.status==201){
            if(this.isJson(Data.data)){
              let DataRetorno=JSON.parse(Data.data)
              if(DataRetorno['Detalles']['Paso'] && DataRetorno['Principal']['Paso'] && DataRetorno['Principal']['Saldo']){
                resolve({
                  correcto:true,
                  data:DataRetorno,
                  mensaje:''
                })
              }else if(!DataRetorno['Detalles']['Paso'] && !DataRetorno['Principal']['Paso'] && !DataRetorno['Principal']['Saldo']){
                resolve({
                  correcto:false,
                  data:DataRetorno,
                  mensaje:'NoRegistradoNada'
                })
              }else{
                resolve({
                  correcto:true,
                  data:DataRetorno,
                  mensaje:'errorapi'
                })
              }
              
            }else{
              resolve({
                correcto:false,
                data:Data,
                mensaje:'errorjson'
              })
            }
          }else{
            resolve({
              correcto:false,
              data:Data,
              mensaje:'succes-failed'
            })
          }
      },(errorData)=>{
        
        console.log(errorData)
        resolve({
          correcto:false,
          data:errorData,
          mensaje:'failed-failed'
        })
      })
    })
    
  }  

   isJson(str) {
    try {
       let val= JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
}
