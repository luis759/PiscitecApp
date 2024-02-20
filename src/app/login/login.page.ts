import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
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
  messageg=[]
  constructor(private master:MasterService,private navcontroller:NavController,private load:LoadingController,private translate:TranslateService) {
    this.translate.get("login").subscribe(dataTranslate=>{
      this.message=dataTranslate
     })
     this.translate.get("global").subscribe(dataTranslate=>{
      this.messageg=dataTranslate
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
        if(Usuarios){
          let usuarioselect=null;
         for (let i = 0; i < Usuarios[0].length; i++) {
           if(Usuarios[0][i]['Cedula']==this.DataForm.nombreusuario.value && Usuarios[0][i]['Palabra']==this.DataForm.clave.value){
             usuarioselect=Usuarios[0][i]
            }
         }
         if(usuarioselect){
          this.master.LoadMensajeActualizando(this.load,this.messageg['loadMensaje']).then(()=>{
            this.buscarDato(usuarioselect)
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
  buscarDato(usuarioselect:any){
    this.master.Empresas.getAllEmpresas().then((empresas)=>{
      let Dataempresas=empresas
      this.master.Responsable.getAllREsponsables().then((responsables)=>{
        let Dataresponsables=responsables
        this.master.especies.getAllEspecies().then((especies)=>{
          let Dataespecies=especies
          this.master.granja.getAllGranjas().then((granjas)=>{
            let Datagranjas=granjas
            this.master.permisos.getAllPermisos().then((permisos)=>{
              let Datapermisos=permisos
              this.master.fisicoquimicos.getAllFisicosQuimicosParametros().then((fisicoquimicos)=>{
                let datafisicoquimicos=fisicoquimicos
                this.master.consumos.getAllMaterias().then((materia)=>{
                  let dataMaterias=materia
                  this.master.mortalidadt.getAllCausas().then((allcausas)=>{
                    let dataCausas=allcausas
                    this.master.granja.getAllEspaciosWithCOD().then((espacios)=>{
                      let dataespacios=espacios
                      this.master.granja.getAllEspaciosLotesDiferentes().then((especieslotesdiferente)=>{
                        let datoespecieslotesdiferente=especieslotesdiferente
                        this.master.consumos.getConsultaDieta().then((getAllconsumos)=>{
                          let datoConsumosAll=getAllconsumos
                          if(Dataempresas['correcto'])
                          {
                            if(Dataresponsables['correcto'])
                            {
                              if(Dataespecies['correcto'])
                              {
                                if(Datagranjas['correcto'])
                                {
                                  if(Datapermisos['correcto'])
                                  {
                                    if(datafisicoquimicos['correcto'])
                                      {
                                        if(dataMaterias['correcto'])
                                        {
                                          if(dataCausas['correcto'])
                                          {
                                              if(dataespacios['correcto'])
                                              {
                                                if(datoespecieslotesdiferente['correcto'])
                                              {
                                                    if(datoConsumosAll['correcto'])
                                                  {
                                                    this.guardarinfoenBasedeDatos(usuarioselect,Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],dataCausas['data']['causas'],dataespacios['data']['espacios'],datoespecieslotesdiferente['data']['espacios'],datoConsumosAll['data']['consultadieta'])
                                            
                                                  }else{
                                                    this.guardarinfoenBasedeDatos(usuarioselect,Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],dataCausas['data']['causas'],dataespacios['data']['espacios'],datoespecieslotesdiferente['data']['espacios'],null)
                                                  }
                                              
                                              }else{
                                                this.guardarinfoenBasedeDatos(usuarioselect,Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],dataCausas['data']['causas'],dataespacios['data']['espacios'],null,null)             
                                              }
                                        }else{
                                          this.guardarinfoenBasedeDatos(usuarioselect,Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],dataCausas['data']['causas'],null,null,null)
                                        }
                                          }else{
                                            this.guardarinfoenBasedeDatos(usuarioselect,Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],null,null,null,null)
                                          }
                                        }else{
                                          this.guardarinfoenBasedeDatos(usuarioselect,Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],null,null,null,null,null)
                                        }
                                      }
                                      else
                                      {
                                        this.guardarinfoenBasedeDatos(usuarioselect,Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],null,null,null,null,null,null)                          
                                      }
                                  }
                                  else
                                  {
                                    this.guardarinfoenBasedeDatos(usuarioselect,Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],null,null,null,null,null,null,null)
                                  }
                                }
                                else
                                {
                                  this.guardarinfoenBasedeDatos(usuarioselect,Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],null,null,null,null,null,null,null,null)
                                }
                              }
                              else
                              {
                                this.guardarinfoenBasedeDatos(usuarioselect,Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],null,null,null,null,null,null,null,null,null)
                              }
                            }else{
                              this.guardarinfoenBasedeDatos(usuarioselect,Dataempresas['data']['empresas'],null,null,null,null,null,null,null,null,null,null)
                            }
                          }
                          else
                          {
                            this.guardarinfoenBasedeDatos(usuarioselect,null,null,null,null,null,null,null,null,null,null,null)
                          }

                        })
                      })
                   })
                  })
                })
              })
            })
          })
        })
      })
    })
  }
  guardarinfoenBasedeDatos(usuarioselect,empresas,responsable,especies,granja,permisos,fisicosquimicosparametros,materias,causas,espacios,lotesespaciodiferentes,consumosall){
    if(especies){
      this.master.storage.DeleteKey(this.master.storage.arrayname.Especies).then(()=>{
        this.master.storage.addItem(this.master.storage.arrayname.Especies,especies).then(()=>{
          if(empresas){
            this.master.storage.DeleteKey(this.master.storage.arrayname.Empresas).then(()=>{
              this.master.storage.addItem(this.master.storage.arrayname.Empresas,empresas).then(()=>{
                if(responsable){
                  this.master.storage.DeleteKey(this.master.storage.arrayname.Responsables).then(()=>{
                    this.master.storage.addItem(this.master.storage.arrayname.Responsables,responsable).then(()=>{
                      if(granja){
                        this.master.storage.DeleteKey(this.master.storage.arrayname.Granjas).then(()=>{
                          this.master.storage.addItem(this.master.storage.arrayname.Granjas,granja).then(()=>{
                            if(permisos){
                              this.master.storage.DeleteKey(this.master.storage.arrayname.Permisos).then(()=>{
                                this.master.storage.addItem(this.master.storage.arrayname.Permisos,permisos).then(()=>{
                                  if(fisicosquimicosparametros){
                                    this.master.storage.DeleteKey(this.master.storage.arrayname.fisicosquimicosparametros).then(()=>{
                                      this.master.storage.addItem(this.master.storage.arrayname.fisicosquimicosparametros,fisicosquimicosparametros).then(()=>{
                                        if(materias){
                                          this.master.storage.DeleteKey(this.master.storage.arrayname.Materias).then(()=>{
                                            this.master.storage.addItem(this.master.storage.arrayname.Materias,materias).then(()=>{
                                              if(causas){
                                                this.master.storage.DeleteKey(this.master.storage.arrayname.Causas).then(()=>{
                                                  this.master.storage.addItem(this.master.storage.arrayname.Causas,causas).then(()=>{
                                                    if(espacios){
                                                      this.master.storage.DeleteKey(this.master.storage.arrayname.EspaciosByCod).then(()=>{
                                                        this.master.storage.addItem(this.master.storage.arrayname.EspaciosByCod,espacios).then(()=>{
                                                          if(lotesespaciodiferentes){
                                                            this.master.storage.DeleteKey(this.master.storage.arrayname.espacioLotesDiferentes).then(()=>{
                                                              this.master.storage.addItem(this.master.storage.arrayname.espacioLotesDiferentes,lotesespaciodiferentes).then(()=>{
                                                                if(consumosall){
                                                                  this.master.storage.DeleteKey(this.master.storage.arrayname.ConsultaDieta).then(()=>{
                                                                    this.master.storage.addItem(this.master.storage.arrayname.ConsultaDieta,consumosall).then(()=>{
                                                      
                                                                      this.finalizaciondeBusqueda(usuarioselect)
                                                                    })
                                                                  })
                                                                }else{
                                                                  this.finalizaciondeBusqueda(usuarioselect)
                                                                }
                                                              })
                                                            })
                                                          }else{
                                                            this.finalizaciondeBusqueda(usuarioselect)
                                                          }
                                                        })
                                                      })
                                                    }else{
                                                      this.finalizaciondeBusqueda(usuarioselect)
                                                    }
                                                  })
                                                })
                                              }else{
                                                this.finalizaciondeBusqueda(usuarioselect)
                                              }
                                            })
                                          })
                                        }else{
                                          this.finalizaciondeBusqueda(usuarioselect)
                                        }
                                      })
                                    })
                                  }else{
                                    this.finalizaciondeBusqueda(usuarioselect)
                                  }
                                })
                              })
                            }else{
                              this.finalizaciondeBusqueda(usuarioselect)
                            }
                          })
                        })
                      }else{
                        this.finalizaciondeBusqueda(usuarioselect)
                      }
                    })
                  })
                }else{
                  this.finalizaciondeBusqueda(usuarioselect)
                }
              })
            })
          }else{
            this.finalizaciondeBusqueda(usuarioselect)
          }
        })
      })
    }else{
      this.finalizaciondeBusqueda(usuarioselect)
    }
}
finalizaciondeBusqueda(usuarioselect:any){
  this.load.dismiss()
  this.master.storage.DeleteKey(this.master.storage.arrayname.UsuarioActivo).then(()=>{
    this.master.storage.addItem(this.master.storage.arrayname.UsuarioActivo,usuarioselect).then(()=>{
      this.master.storage.DeleteKey(this.master.storage.arrayname.ultimaActualizacion).then(()=>{
        this.master.storage.addItem(this.master.storage.arrayname.ultimaActualizacion,new Date()).then(()=>{
          this.navcontroller.navigateRoot("menu/home")
        })
      })
    })
  })
}
}
