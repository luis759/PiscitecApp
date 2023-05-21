import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { MasterService } from '../services/master.service';
import { StorageService } from '../services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.page.html',
  styleUrls: ['./responsable.page.scss'],
})
export class ResponsablePage implements OnInit {
  DataForm={
    CEDULA:'',
    NOMBRES:'',
    empresa:null
  }
  empresas=[]
  message=[]
  constructor(private master:MasterService,private translate:TranslateService,
    private Storage:StorageService,private alert:AlertController,private loading:LoadingController) { }

  ngOnInit() {
    this.translate.get("responsable").subscribe(dataTranslate=>{
      this.message=dataTranslate
     })
   this.InicilizarTodo()
  }
  InicilizarTodo(){
    this.master.storage.getItems(this.master.storage.arrayname.Empresas).then((Empresass)=>{
      if(Empresass){
       this.empresas=Empresass[0]
      }else{
       this.empresas=[]
      }
   })
  }
  validarData(){
    if(this.DataForm.NOMBRES){
      if(this.DataForm.NOMBRES.length>0){
          if(this.DataForm.empresa){
                if(this.DataForm.CEDULA){
                  if(this.DataForm.CEDULA.toString().length>0){
                    this.enviarData();
                  }else{
                    this.master.toastMensaje(this.message['validar1'],1000)
                  }
                }else{
                  this.master.toastMensaje(this.message['validar1'],1000)
                }           
          }else{
            this.master.toastMensaje(this.message['validar2'],1000)
          }
      }else{
        this.master.toastMensaje(this.message['validar3'],1000)
      }
    }else{
      this.master.toastMensaje(this.message['validar3'],1000)
    }
  }
  Limpiar(){
this.DataForm={
  CEDULA:'',
  NOMBRES:'',
  empresa:null
}
  }
  enviarData(){
    this.master.Load(this.loading).then(()=>{
        let DataResponsable=this.master.Responsable.Responsables
        DataResponsable.CEDULA=this.DataForm.CEDULA
        DataResponsable.NOMBRES=this.DataForm.NOMBRES
        DataResponsable.IDEMP=this.DataForm.empresa['IDEMP']
        this.Storage.getItems(this.Storage.arrayname.UsuarioActivo).then((DataUsuario)=>{
          let Usuarios=DataUsuario[0]
          DataResponsable.USUARIO=Usuarios['Cedula']
          this.master.Responsable.postNewResponsables(DataResponsable).then((NuevoResponsable)=>{
            if(NuevoResponsable['correcto']){
                this.master.Responsable.getAllREsponsables().then((DataResponsables)=>{
                  if(DataResponsables['correcto']){
                    this.Storage.DeleteKey(this.Storage.arrayname.Responsables).then(()=>{
                      this.Storage.addItem(this.Storage.arrayname.Responsables,DataResponsables['data']['responsables']).then(()=>{
                        this.loading.dismiss().then(()=>{
                          this.Limpiar()
                          this.master.MensajeAlert(this.message['enviardata1'],this.message['enviardatatitle'])
                        })
                      })
                    })
                    
                  }else{
                    this.loading.dismiss().then(()=>{
                      this.Limpiar()
                      this.master.MensajeAlert(this.message['enviardata2'],this.message['enviardatatitle'])
                    })
                  }
                })
            }else{
                if(NuevoResponsable['mensaje']=="errorapi"){
                  this.loading.dismiss().then(()=>{
                    this.master.MensajeAlert(NuevoResponsable['data']['responsables']['message'],this.message['enviardataerrtitle'])
                  })
                }else{
                  this.loading.dismiss().then(()=>{
                    this.master.MensajeAlert(this.message['enviardataerr1'],this.message['enviardataerrtitle'])
                  })
                }
            }
          })
        })
    })
  }
  changeEmpresas(evento){

  }

}
