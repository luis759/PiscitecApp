import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  reportes=[{
    id:1,
    name:"Biometrias"
  },{
    id:2,
    name:"Vacunas"
  },{
    id:4,
    name:"Mortalidad"
  },{
    id:3,
    name:"Fisicos - Quimicos"
  }]
  inventarios=[{
    id:5,
    name:"Consumo de Materias"
  }]
  valorinicial=0
  constructor(private navcontorll:NavController,private master:MasterService) {


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
              this.master.toastMensaje("No tienes Permiso para ingresar",2000)
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
              this.master.toastMensaje("No tienes Permiso para ingresar",2000)
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
              this.master.toastMensaje("No tienes Permiso para ingresar",2000)
            }
          }
        })
        })
      }else if(this.valorinicial==4){
        this.master.storage.getItems(this.master.storage.arrayname.Permisos).then((datos)=>{
          this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((UsusarioActiv)=>{
          if(datos.length>0){
            let valorPaso=true
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
              this.master.toastMensaje("No tienes Permiso para ingresar",2000)
            }
          }
        })
        })
      }else if(this.valorinicial==5){
        this.master.storage.getItems(this.master.storage.arrayname.Permisos).then((datos)=>{
          this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((UsusarioActiv)=>{
          if(datos.length>0){
            let valorPaso=true
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
              this.master.toastMensaje("No tienes Permiso para ingresar",2000)
            }
          }
        })
        })
      }
    }
  }
}
