import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  DataForm={
    nombreusuario:{
      value:'',
      error:false,
      Mensaje:'',
      maxcaracteres:400,
      mincaracteres:1,
      only: 'email'
    },
    clave:{
      value:'',
      error:false,
      Mensaje:'',
      maxcaracteres:20,
      mincaracteres:1,
      only: ''
    },
    recordar:false
  }
  message=[]
  constructor(private master:MasterService,private navcontroller:NavController,private translate:TranslateService) {
    this.translate.get("login").subscribe(dataTranslate=>{
      this.message=dataTranslate
     })
   }
    validardatosIngreso(){
     if(this.DataForm.clave.value){
       if(this.DataForm.nombreusuario.value){
          this.buscarEnbasededatos()
       }else{
        this.master.MensajeAlert(this.message['mensajevalidaringreso1'],"Error Login")
       }
     }else{
      this.master.MensajeAlert(this.message['mensajevalidaringreso2'],"Error Login")
     }
    }
    buscarEnbasededatos(){
      this.master.storage.getItems(this.master.storage.arrayname.Usuarios).then((Usuarios)=>{
        console.log(Usuarios)
        if(Usuarios){
          let usuarioselect=null;
         for (let i = 0; i < Usuarios[0].length; i++) {
           if(Usuarios[0][i]['Cedula']==this.DataForm.nombreusuario.value && Usuarios[0][i]['Palabra']==this.DataForm.clave.value){
             usuarioselect=Usuarios[0][i]
            }
         }
         if(usuarioselect){
           this.master.storage.DeleteKey(this.master.storage.arrayname.UsuarioActivo).then(()=>{
             this.master.storage.addItem(this.master.storage.arrayname.UsuarioActivo,usuarioselect).then(()=>{
               this.navcontroller.navigateRoot("menu/home")
             })
           })
         }else{
           this.master.MensajeAlert(this.message['buscarbasededatos1'],"Error Login")
         }
        }else{
         this.master.MensajeAlert(this.message['buscarbasededatos2'],"Error Login")
        }
      })
    }
  ngOnInit() {
  }

}
