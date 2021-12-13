import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { MenuPage } from '../menu/menu.page';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-reportvacun',
  templateUrl: './reportvacun.page.html',
  styleUrls: ['./reportvacun.page.scss'],
})
export class ReportvacunPage implements OnInit {
  DataForm={
    Lote:{
      value:''
    },
    proveedor:{
      value:''
    },
    laboratorio:{
      value:''
    },
    tipovacuna:{
      value:''
    },
    lotevacuna:{
      value:''
    },Cantidad:{
      value:''
    },Peso:{
      value:''
    },Personas:{
      value:''
    },observaciones:{
      value:''
    },
    fecha:new Date().toString(),
    startdate:new Date().toString(),
    enddate:new Date().toString(),
    empresa:null,
    granja:null,
    vacunacionhoras:false,
    responsable:null
  }
  yearMax=(new Date().getFullYear())+1
  yearMin=(new Date().getFullYear())-1
  empresas=[]
  granjas=[]
  espacios=[]
  responsables=[]
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,private navcontroll:NavController,private menu:MenuPage) 
  { }
  changeResponsable(evento){
    
  }
  ngOnInit() {
    this.menu.activarmenuDesactivar(false);
    this.master.storage.getItems(this.master.storage.arrayname.Empresas).then((Empresass)=>{
       if(Empresass){
        this.empresas=Empresass[0]
       }else{
        this.empresas=[]
       }
    })
  }
  ngOnDestroy() {
    this.menu.activarmenuDesactivar(true);
  }
  changeEmpresas(evento){
    let idempres=evento.value['IDEMP']
    let mostrarGranjas=[]
    this.granjas=[]
    this.espacios=[]
    this.responsables=[]
    this.DataForm.granja=null
    this.DataForm.responsable=null
    this.master.storage.getItems(this.master.storage.arrayname.Granjas).then((Granjas)=>{
      if(Granjas){
        for(let i=0;i<Granjas[0].length;i++){
          if(Granjas[0][i]['IDEMP']==idempres){
            let val=mostrarGranjas.push(Granjas[0][i])
          }
        }
        this.granjas=mostrarGranjas
      }
    })
  }
  changeGranjas(evento){
    let idgranjas=evento.value['IDGRA']
    let mostrarResponsables=[]
    this.responsables=[]
    this.espacios=[]
    this.DataForm.responsable=null
    this.master.storage.getItems(this.master.storage.arrayname.Responsables).then((Responsables)=>{
      if(Responsables){
        for(let i=0;i<Responsables[0].length;i++){
          if(Responsables[0][i]['IDGRA']==idgranjas && this.DataForm.empresa['IDEMP']==Responsables[0][i]['IDEMP']){
            let val=mostrarResponsables.push(Responsables[0][i])
          }
        }
        this.responsables=mostrarResponsables
      }
    })
  }

  limpiarData(){
    this.DataForm={
      Lote:{
        value:''
      },
      proveedor:{
        value:''
      },
      laboratorio:{
        value:''
      },
      tipovacuna:{
        value:''
      },
      lotevacuna:{
        value:''
      },Cantidad:{
        value:''
      },Peso:{
        value:''
      },Personas:{
        value:''
      },observaciones:{
        value:''
      },
      fecha:new Date().toString(),
      startdate:new Date().toString(),
      enddate:new Date().toString(),
      empresa:null,
      granja:null,
      vacunacionhoras:false,
      responsable:null
    }
  }
  ValidarRegistro(){
      if(this.DataForm.empresa){
        if(this.DataForm.granja){
          if(this.DataForm.responsable){
                  if(this.DataForm.Lote.value){
                        if(parseFloat(this.DataForm.Lote.value)>0){
                          if(this.DataForm.Cantidad.value){
                          if(parseFloat(this.DataForm.Cantidad.value)>0){
                            if(this.DataForm.Personas.value){
                              if(parseFloat(this.DataForm.Personas.value)>0){
                                if(this.DataForm.Peso.value){
                                  if(parseFloat(this.DataForm.Peso.value)>0){
                                     if(this.DataForm.laboratorio.value){
                                      if(this.DataForm.tipovacuna.value){
                                        if(this.DataForm.lotevacuna.value){
                                          if(this.DataForm.proveedor.value){
                                            if(this.DataForm.vacunacionhoras){
                                              if(new Date(formatDate(this.DataForm.startdate , 'yyyy-MM-dd HH:mm:ss', 'en'))>=new Date(formatDate(this.DataForm.enddate , 'yyyy-MM-dd HH:mm:ss', 'en'))){
                                                this.master.toastMensaje("la hora de inicio no puede ser mayor igual que la de fin",1500)
                                              }else{
                                                this.seguir()
                                              }
                                            }else{
                                              this.seguir()
                                            }
                                          }else{
                                           this.master.toastMensaje("Coloque al menos un proveedor",1500)
                                          }
                                        }else{
                                         this.master.toastMensaje("Coloque al menos un lote de vacuna",1500)
                                        }
                                      }else{
                                       this.master.toastMensaje("Coloque al menos un tipo de vacuna",1500)
                                      }
                                     }else{
                                      this.master.toastMensaje("Coloque al menos un laboratorio",1500)
                                     }
                                    }else{
                                      this.master.toastMensaje("Peso debe ser mayor a 0",1500)
                                    }
                                  }else{
                                    this.master.toastMensaje("Debe colocar al menos un Peso",1500)
                                  }
                                }else{
                                  this.master.toastMensaje("Personas debe ser mayor a 0",1500)
                                }
                              }else{
                                this.master.toastMensaje("Debe colocar al menos una Personas",1500)
                              }
                            }else{
                              this.master.toastMensaje("Cantidad debe ser mayor a 0",1500)
                            }
                          }else{
                            this.master.toastMensaje("Debe colocar al menos una cantidad",1500)
                          }
                        }else{
                          this.master.toastMensaje("Lote debe ser mayor a 0",1500)
                        }
                  }else{
                    this.master.toastMensaje("Debe colocar al menos un lote",1500)
                  }
          }else{  
            this.master.toastMensaje("Debe seleccionar un responsable",1500)
          }
        }else{
          this.master.toastMensaje("Debe seleccionar una granja",1500)
        }
      }else{
        this.master.toastMensaje("Debe seleccionar una empresa",1500)
      }
  }
  seguir(){
    this.master.Load(this.loadingController).then(()=>{
      this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((Usuario)=>{
        let id=Usuario[0]['Cedula']
        let valor=this.master.vacunas.Vacuna
        valor.FECHA=formatDate(new  Date(this.DataForm.fecha) , 'yyyy-MM-dd', 'en')
        valor.IDEMP=this.DataForm.empresa['IDEMP']
        valor.IDGRA=this.DataForm.granja['IDGRA']
        valor.LOTE=this.DataForm.Lote.value
        valor.ANEXO=''
        valor.CANTIDAD=this.DataForm.Cantidad.value
        valor.HORAFIN=this.DataForm.vacunacionhoras?formatDate(new  Date(this.DataForm.enddate) , 'yyyy-MM-dd HH:mm:ss', 'en'):''
        valor.HORAINI=this.DataForm.vacunacionhoras?formatDate(new  Date(this.DataForm.startdate) , 'yyyy-MM-dd HH:mm:ss', 'en'):''
        valor.LABORATORIO=this.DataForm.laboratorio.value
        valor.LOTE=this.DataForm.Lote.value
        valor.LOTEVACUNA=this.DataForm.lotevacuna.value
        valor.OBSERVACIONES=this.DataForm.observaciones.value
        valor.PERSONAS=this.DataForm.Personas.value
        valor.PESO=this.DataForm.Peso.value
        valor.PROVEEDOR=this.DataForm.proveedor.value
        valor.TIPOVACUNA=this.DataForm.tipovacuna.value
        valor.RESPONSABLE=this.DataForm.responsable['COD']
        valor.USUARIO=id
          this.master.vacunas.postNewVacunas(valor).then((NewVacunas)=>{
            let ReporteGen=this.master.storage.vacunareporte
            ReporteGen.ReporteInicial=valor
            ReporteGen.enviado=false
            if(!NewVacunas['correcto'] && NewVacunas['data']['status']==-1){
              this.GuardarRegistroDeReportes(ReporteGen,false,false)
              this.loadingController.dismiss()
            }else{
              if(NewVacunas['correcto']){
                ReporteGen.dataEnviado=NewVacunas['data']
                ReporteGen.enviado=true
                this.GuardarRegistroDeReportes(ReporteGen,true,false)
                this.loadingController.dismiss()
              }else if(NewVacunas['correcto'] && NewVacunas['mensaje']=="errorapi"){ 
                ReporteGen.enviado=true
                ReporteGen.dataEnviado=NewVacunas['data']
                this.GuardarRegistroDeReportes(ReporteGen,true,true)
                this.loadingController.dismiss()
              }else{
                this.GuardarRegistroDeReportes(ReporteGen,false,true)
                this.loadingController.dismiss()
              }
            }
          })
        })
    })
  }
  GuardarRegistroDeReportes(Report,Enviado,Erroes){
    this.master.storage.getItems(this.master.storage.arrayname.VacunaReporte).then((Info)=>{
      let Registros=[]
      if(Info){
       Registros=Info[0]
      }
      this.master.storage.DeleteKey(this.master.storage.arrayname.VacunaReporte).then(()=>{
        let array=Registros
        let valor=array.push(Report)
        this.master.storage.addItem(this.master.storage.arrayname.VacunaReporte,array).then(()=>{
          if(Enviado){
            this.limpiarData()
            this.master.MensajeAlert("Registro Guardado y Enviado","Reporte de vacunacion")
          }else{
            this.limpiarData()
            this.master.MensajeAlert("Registro Guardado","Reporte de vacunacion")
          }
        })
      })
    })
  }
}
