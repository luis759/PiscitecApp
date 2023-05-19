import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  reportes=[{
    id:1,
    name:"Biometrías"
  },{
    id:2,
    name:"Vacunas"
  },{
    id:4,
    name:"Mortalidad"
  },{
    id:3,
    name:"Físico-Químicos"
  }]
  inventarios=[{
    id:5,
    name:"Consumo de Materias Primas"
  }]
  valorinicial=0
  message=[]
  constructor(private navcontorll:NavController,private translate:TranslateService,private master:MasterService,) {
    this.translate.get("home").subscribe(dataTranslate=>{
      this.message=dataTranslate
      this.inventarios[0].name=this.message['optionoth1']
      this.reportes[0].name=this.message['option1']
      this.reportes[1].name=this.message['option2']
      this.reportes[2].name=this.message['option3']
      this.reportes[3].name=this.message['option4']
     })

  }
  radioGroupChange(evento){
    this.valorinicial=evento.detail.value;
  }
  irAlGenerarReporte(){
    if(this.valorinicial==0){

    }else{
      if(this.valorinicial==1){
        this.master.storage.getItems(this.master.storage.arrayname.Permisos).then((datos)=>{
          this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((UsusarioActiv)=>{
          if(datos.length>0){
            let valorPaso=false
            datos[0].forEach((valor)=>{
              if(String(valor.UsuarioAcc)==String(UsusarioActiv[0]['Cedula'])){
                if(valor.IdMod==2 && valor.IdHoja==12){
                  if(valor.PermisoIng==1){
                    valorPaso=true;
                  }
                }
              }
            })
            if(valorPaso){
              this.navcontorll.navigateForward("menu/reportinicial")
            }else{
              this.master.toastMensaje(this.message['mensajenopermiso'],2000)
            }
          }
        })
        })
      }else  if(this.valorinicial==2){
        this.master.storage.getItems(this.master.storage.arrayname.Permisos).then((datos)=>{
          this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((UsusarioActiv)=>{
          if(datos.length>0){
            let valorPaso=false
            datos[0].forEach((valor)=>{
              if(String(valor.UsuarioAcc)==String(UsusarioActiv[0]['Cedula'])){
                if(valor.IdMod==2 && valor.IdHoja==14){
                  if(valor.PermisoIng==1){
                    valorPaso=true;
                  }
                }
              }
            })
            if(valorPaso){
              this.navcontorll.navigateForward("menu/reportvacun")
            }else{
              this.master.toastMensaje(this.message['mensajenopermiso'],2000)
            }
          }
        })
        })
      }else if(this.valorinicial==3){
        this.master.storage.getItems(this.master.storage.arrayname.Permisos).then((datos)=>{
          this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((UsusarioActiv)=>{
          if(datos.length>0){
            let valorPaso=false
            datos[0].forEach((valor)=>{
              if(String(valor.UsuarioAcc)==String(UsusarioActiv[0]['Cedula'])){
                if(valor.IdMod==2 && valor.IdHoja==10){
                  if(valor.PermisoIng==1){
                    valorPaso=true;
                  }
                }
              }
            })
            if(valorPaso){
              this.navcontorll.navigateForward("menu/fisicoquimicos")
            }else{
              this.master.toastMensaje(this.message['mensajenopermiso'],2000)
            }
          }
        })
        })
      }else if(this.valorinicial==4){
        this.master.storage.getItems(this.master.storage.arrayname.Permisos).then((datos)=>{
          this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((UsusarioActiv)=>{
          if(datos.length>0){
            let valorPaso=false
            datos[0].forEach((valor)=>{
              if(String(valor.UsuarioAcc)==String(UsusarioActiv[0]['Cedula'])){
                if(valor.IdMod==4 && valor.IdHoja==1){
                  if(valor.PermisoIng==1){
                    valorPaso=true;
                  }
                }
              }
            })
            if(valorPaso){
              this.navcontorll.navigateForward("menu/mortalidad")
            }else{
              this.master.toastMensaje(this.message['mensajenopermiso'],2000)
            }
          }
        })
        })
      }else if(this.valorinicial==5){
        this.master.storage.getItems(this.master.storage.arrayname.Permisos).then((datos)=>{
          this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((UsusarioActiv)=>{
          if(datos.length>0){
            let valorPaso=false
            datos[0].forEach((valor)=>{
              if(String(valor.UsuarioAcc)==String(UsusarioActiv[0]['Cedula'])){
                if(valor.IdMod==4 && valor.IdHoja==1){
                  if(valor.PermisoIng==1){
                    valorPaso=true;
                  }
                }
              }
            })
            if(valorPaso){
              this.navcontorll.navigateForward("menu/materiasconsumo")
            }else{
              this.master.toastMensaje(this.message['mensajenopermiso'],2000)
            }
          }
        })
        })
      }
    }
  }
}
