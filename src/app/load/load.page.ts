import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.page.html',
  styleUrls: ['./load.page.scss'],
})
export class LoadPage implements OnInit {

  constructor(private navcontroll:NavController,private master:MasterService) { 
    this.CheckInternet()
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
                            this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],Datapermisos['data']['permisos'])
                          }
                          else
                          {
                            this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],Datagranjas['data']['granjas'],null)
                          }
                        }
                        else
                        {
                          this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],Dataespecies['data']['especies'],null,null)
                        }
                      }
                      else
                      {
                        this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],Dataresponsables['data']['responsables'],null,null,null)
                      }
                    }else{
                      this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],Dataempresas['data']['empresas'],null,null,null,null)
                    }
                  }
                  else
                  {
                    this.guardarinfoenBasedeDatos(Datausuarios['data']['usuarios'],null,null,null,null,null)
                  }
                }else{
                  this.guardarinfoenBasedeDatos(null,null,null,null,null,null)
                }
              })
            })
          })
        })
      })
    })
  }
  guardarinfoenBasedeDatos(usuario,empresas,responsable,especies,granja,permisos){
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
