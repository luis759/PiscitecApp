import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { EmpresasService } from '../api/empresas.service';
import { EspeciesService } from '../api/especies.service';
import { FisicoquimicosService } from '../api/fisicoquimicos.service';
import { GranjasService } from '../api/granjas.service';
import { PermisosService } from '../api/permisos.service';
import { ReportesService } from '../api/reportes.service';
import { ResponsablesService } from '../api/responsables.service';
import { UsuarioService } from '../api/usuario.service';
import { VacunaService } from '../api/vacuna.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private platform:Platform,public storage:StorageService,public reportes:ReportesService,
    public usuario:UsuarioService,public Empresas:EmpresasService,public granja:GranjasService,public Responsable:ResponsablesService,
    public permisos:PermisosService,public especies:EspeciesService,public vacunas:VacunaService,public fisicoquimicos:FisicoquimicosService,
    public alertController: AlertController,private routr:Router,private navController:NavController,private toast:ToastController) { }
    
    async Load(LoadingControllers:LoadingController):Promise<void> {
      let load = await LoadingControllers.create({
         message: 'Por Favor Espere..',
         translucent: true,
         cssClass: 'custom-class custom-loading'
       })
       return load.present()
     };
  public async MensajeAlert(Mensajes,Titulos){
    let titulo=Titulos
    let mensaje=Mensajes
    let subtitle=""
  const alert = await this.alertController.create({
    header:titulo,
    subHeader: subtitle,
    message: mensaje,
    buttons: ['OK']
  });

  await alert.present();
 }
 public async toastMensaje(Mensajes,times){
  let Mensajess=Mensajes
  let time=times
const alert = await this.toast.create({
  message: Mensajess,
  duration: time,
  position: 'top'
});

await alert.present();
}
  corregirerrores(texto,object){
    object.Mensaje=""
    object.error=false
    object.lines=""
    if(object.mincaracteres>0){
      if(!texto){
        object.Mensaje="<p class='error ion-text-center'>Este campo es obligatorio</p>"
        object.error=true
      }else{
        if(object.only=="email"){
          let valor=true
          if(texto.includes("@")){
            if(texto.includes(".")){
              if(texto.split("@").length>1){
                if(texto.split(".").length>1){
                  valor=false
                 }
              }
            }
          }
          if(valor){
            object.Mensaje="<p class='error ion-text-center'>Debes colocar un correo correcto xxx@xxx.xx</p>"
            object.error=true
          }
        }
        if(object.only=="number"){
          let reg=/[0-9]+/
          if(!reg.test(texto.toString())){
            object.Mensaje="<p class='error ion-text-center'>Solo se acepta numeros no se acepta caracteres</p>"
            object.error=true
          }
        }
        if(object.only=="string"){
          let reg=/[A-Za-z]+/
          if(!reg.test(texto.toString())){
            object.Mensaje="<p class='error ion-text-center'>Solo se acepta caracteres no se acepta numeros</p>"
            object.error=true
          }
        }
        if(object.mincaracteres>texto.toString().length){
          object.Mensaje="<p class='error ion-text-center'>No puede contener menos de "+object.mincaracteres+" caracteres</p>"
          object.error=true
        }
        if(object.maxcaracteres>0){
          if(texto.toString().length>object.maxcaracteres){
            object.Mensaje="<p class='error ion-text-center'>No puede contener mas de "+object.maxcaracteres+" caracteres</p>"
            object.error=true
          }
        }
     
      }
    }
   
    
   
    if(object.error){
      object.lines="border-bottom:1px solid  #ed5565"
    }
  }
}
