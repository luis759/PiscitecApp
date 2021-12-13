import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacunaService {
  Vacuna={
    IDEMP:'',
    IDGRA:'',
    LOTE:'',
    FECHA:'',
    PROVEEDOR:'',
    LABORATORIO:'',
    LOTEVACUNA:'',
    HORAINI:'',
    HORAFIN:'',
    CANTIDAD:'',
    TIPOVACUNA:'',
    PESO:'',
    PERSONAS:'',
    RESPONSABLE:'',
    OBSERVACIONES:'',
    ANEXO:'',
    USUARIO:''
  }
  constructor(private httpnative:HTTP) { 

  }
  //API PARA REGISTRAR UNA VACUNA
postNewVacunas(Vacuna:any):Promise<any>{
  return new Promise((resolve)=>{
    this.httpnative.setRequestTimeout(60)
    let nativecall=this.httpnative.post(environment.urlApi+'registro/vacuna',Vacuna,{'Accept': 'application/json','Content-Type': 'application/json'})
    nativecall.then((Data)=>{
        if(Data.status==200 || Data.status==201){
          if(this.isJson(Data.data)){
            let DataRetorno=JSON.parse(Data.data)
            if(DataRetorno['Principal']['Paso']){
              resolve({
                correcto:true,
                data:DataRetorno,
                mensaje:''
              })
            }else{
              resolve({
                correcto:false,
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
//API PARA REGISTRAR UN VACUNA
isJson(str) {
  try {
     let val= JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}
}
