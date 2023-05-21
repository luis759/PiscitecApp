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
    
    this.master.usuario.getInternet().then((usuarios)=>{
      if(!usuarios['correcto']){
        if(usuarios['data']['status']==-1){
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
                                                  this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],dataCausas['data']['causas'],dataespacios['data']['espacios'],datoespecieslotesdiferente['data']['espacios'])
                                          
                                                }else{
                                                  this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],dataCausas['data']['causas'],dataespacios['data']['espacios'],null)             
                                                }
                                          }else{
                                            this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],dataCausas['data']['causas'],null,null)
                                          }
                                            }else{
                                              this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],dataMaterias['data']['materias'],null,null,null)
                                            }
                                          }else{
                                            this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],datafisicoquimicos['data']['parametros'],null,null,null,null)
                                          }
                                        }
                                        else
                                        {
                                          this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'],null,null,null,null,null)                          
                                        }
                                    }
                                    else
                                    {
                                      this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],null,null,null,null,null,null)
                                    }
                                  }
                                  else
                                  {
                                    this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],null,null,null,null,null,null,null)
                                  }
                                }
                                else
                                {
                                  this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],null,null,null,null,null,null,null,null)
                                }
                              }else{
                                this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],null,null,null,null,null,null,null,null,null)
                              }
                            }
                            else
                            {
                              this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],null,null,null,null,null,null,null,null,null,null)
                            }
                          }else{
                            this.guardarinfoenBasedeDatos(null,null,null,null,null,null,null,null,null,null,null)
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
  guardarinfoenBasedeDatos(usuario,empresas,responsable,especies,granja,permisos,fisicosquimicosparametros,materias,causas,espacios,lotesespaciodiferentes){
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
                                                                        console.log(lotesespaciodiferentes)
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
