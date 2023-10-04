import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MasterService } from '../services/master.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-load',
  templateUrl: './load.page.html',
  styleUrls: ['./load.page.scss'],
})
export class LoadPage implements OnInit {

  constructor(private navcontroll:NavController,private translate:TranslateService,private master:MasterService) { 
   this.CheckInternet()
   this.translate.get("global").subscribe(dataTranslate=>{
   })
  }

  ngOnInit() {
  }
  CheckInternet(){
    this.master.storage.getItems(this.master.storage.arrayname.Usuarios).then((datoUsuario)=>{
      console.log(datoUsuario)
      if(datoUsuario){
        if(datoUsuario[0].length>0){
          this.finalizaciondeBusqueda()
        }else{
          this.ExtraerData()
        }
      }else{
        this.ExtraerData()

      }
    })
  }
  ExtraerData(){
    this.master.usuario.getAllUsers().then((usuarios)=>{
      let Datausuarios=usuarios
      if(Datausuarios['correcto'])
                          {
                            this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'])
                           
                          }else{
                            this.guardarinfoenBasedeDatos(null)
                          }
    })
  }
  guardarinfoenBasedeDatos(usuario){
      if(usuario){
        this.master.storage.DeleteKey(this.master.storage.arrayname.Usuarios).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.Usuarios,usuario).then(()=>{
            this.finalizaciondeBusqueda()
          
          })
        })
      }else{
        this.finalizaciondeBusqueda()
      }
  }
  finalizaciondeBusqueda(){
    this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((usuarioactivo)=>{
      if(usuarioactivo){
        this.navcontroll.navigateRoot("menu/home")
      }else{
        this.navcontroll.navigateRoot("login")
      }
    })
  }
}
