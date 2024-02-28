import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from '../services/master.service';
import { formatDate } from '@angular/common';

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
  UltimaActualizacion=""
  constructor(private navcontorll:NavController,private translate:TranslateService,private master:MasterService,private load:LoadingController) {
    this.translate.get("home").subscribe(dataTranslate=>{
      this.message=dataTranslate
      this.inventarios[0].name=this.message['optionoth1']
      this.reportes[0].name=this.message['option1']
      this.reportes[1].name=this.message['option2']
      this.reportes[2].name=this.message['option3']
      this.reportes[3].name=this.message['option4']
     })
     this.MostrarInfo()
  }
  radioGroupChange(evento){
    this.valorinicial=evento.detail.value;
  }
  MostrarInfo(){
    this.master.storage.getItems(this.master.storage.arrayname.ultimaActualizacion).then((Dato)=>{
      if(Dato){
        if(Dato.length>0){
          this.UltimaActualizacion=formatDate(Dato[0] , 'yyyy-MM-dd HH:mm:ss', 'en')
        }
      }
    })
  }
  CheckVersion(){
    this.master.version.getVersion().then((getAllVersion)=>{
      let dataversion=getAllVersion
      if(dataversion['correcto']){
        if(dataversion['data']['version'][0].VERSIONES==this.master.version.DataVersion){
          this.ExtraerData()
        }else{
          this.master.MensajeAlert(this.message['noactualizada'],"Error")
          this.load.dismiss()
        }
      }
    })
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
  actualizarDato(){
    this.master.Load(this.load).then(()=>{
      this.CheckVersion()
    })
  }
  ExtraerData(){
    this.master.usuario.getAllUsers().then((usuarios)=>{
      let Datausuarios=usuarios
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
                          this.master.consumos.getConsultaDieta().then((dataConsumosall)=>{
                            let datoconsumoallinfo=dataConsumosall
                          if(Datausuarios['correcto'])
                          {
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
                                                  if(datoconsumoallinfo['correcto'])
                                                  {
                                                    this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],dataCausas['data']['causas'],dataespacios['data']['espacios'],datoespecieslotesdiferente['data']['espacios'],datoconsumoallinfo['data']['consultadieta'])
                                            
                                                  }else{
                                                    this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],dataCausas['data']['causas'],dataespacios['data']['espacios'],datoespecieslotesdiferente['data']['espacios'],null)
                                                  }
                                                 
                                                }else{
                                                  this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],dataCausas['data']['causas'],dataespacios['data']['espacios'],null,null)             
                                                }
                                          }else{
                                            this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],dataCausas['data']['causas'],null,null,null)
                                          }
                                            }else{
                                              this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],null,null,null,null)
                                            }
                                          }else{
                                            this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],null,null,null,null,null)
                                          }
                                        }
                                        else
                                        {
                                          this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],null,null,null,null,null,null)                          
                                        }
                                    }
                                    else
                                    {
                                      this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],null,null,null,null,null,null,null)
                                    }
                                  }
                                  else
                                  {
                                    this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],null,null,null,null,null,null,null,null)
                                  }
                                }
                                else
                                {
                                  this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],null,null,null,null,null,null,null,null,null)
                                }
                              }else{
                                this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],null,null,null,null,null,null,null,null,null,null)
                              }
                            }
                            else
                            {
                              this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],null,null,null,null,null,null,null,null,null,null,null)
                            }
                          }else{
                            this.guardarinfoenBasedeDatos(null,null,null,null,null,null,null,null,null,null,null,null)
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
    })
  }
  guardarinfoenBasedeDatos(usuario,empresas,responsable,especies,granja,permisos,fisicosquimicosparametros,materias,causas,espacios,lotesespaciodiferentes,consumosdata){
      if(usuario){
        this.master.storage.DeleteKey(this.master.storage.arrayname.Usuarios).then(()=>{
          this.master.storage.addItem(this.master.storage.arrayname.Usuarios,usuario).then(()=>{
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
                                                                        if(consumosdata){
                                                                          this.master.storage.DeleteKey(this.master.storage.arrayname.ConsultaDieta).then(()=>{
                                                                            this.master.storage.addItem(this.master.storage.arrayname.ConsultaDieta,consumosdata).then(()=>{
                                                                              this.finalizaciondeBusqueda()
                                                                            })
                                                                          })
                                                                        }else{
                                                                          this.finalizaciondeBusqueda()
                                                                        }
                                                                      })
                                                                    })
                                                                    
                                                                  }else{
                                                                    this.finalizaciondeBusqueda()
                                                                  }
                                                                })
                                                              })
                                                            }else{
                                                              this.finalizaciondeBusqueda()
                                                            }
                                                          })
                                                        })
                                                      }else{
                                                        this.finalizaciondeBusqueda()
                                                      }
                                                    })
                                                  })
                                                }else{
                                                  this.finalizaciondeBusqueda()
                                                }
                                              })
                                            })
                                          }else{
                                            this.finalizaciondeBusqueda()
                                          }
                                        })
                                      })
                                    }else{
                                      this.finalizaciondeBusqueda()
                                    }
                                  })
                                })
                              }else{
                                this.finalizaciondeBusqueda()
                              }
                            })
                          })
                        }else{
                          this.finalizaciondeBusqueda()
                        }
                      })
                    })
                  }else{
                    this.finalizaciondeBusqueda()
                  }
                })
              })
            }else{
              this.finalizaciondeBusqueda()
            }
          })
        })
      }else{
        this.finalizaciondeBusqueda()
      }
  }
  finalizaciondeBusqueda(){
    this.master.storage.DeleteKey(this.master.storage.arrayname.ultimaActualizacion).then(()=>{
      this.master.storage.addItem(this.master.storage.arrayname.ultimaActualizacion,new Date()).then(()=>{
       
     this.MostrarInfo()
      })
    })
    this.load.dismiss()
  }
}
