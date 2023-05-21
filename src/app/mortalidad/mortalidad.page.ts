import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { MenuPage } from '../menu/menu.page';
import { MortalidadregPage } from '../modals/mortalidadreg/mortalidadreg.page';
import { MasterService } from '../services/master.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-mortalidad',
  templateUrl: './mortalidad.page.html',
  styleUrls: ['./mortalidad.page.scss'],
})
export class MortalidadPage implements OnInit {
  DataForm={
    observaciones:'',
    fecha:new Date().toString(),
    empresa:null,
    granja:null,
    responsable:null
  }
  empresas=[]
  granjas=[]
  responsables=[]
  listmortalidad=[]
  granjaprincipal={} as any
  lotestotal=0
  cantidadtotal=0
  kilostotal=0
  message=[]
  constructor(private translate:TranslateService,private master:MasterService,
    private loadingController:LoadingController,private modalController:ModalController,private menu:MenuPage) { }

  ValidarRegistro(){
    if(this.DataForm.empresa){
      if(this.DataForm.granja){
        if(this.DataForm.responsable){
            if(this.listmortalidad.length>0){
              if(this.checkGranja()){
                this.seguir()
              }else{
                this.master.toastMensaje(this.message['validar1'],3000)
              }
            }else{
              this.master.toastMensaje(this.message['validar2'],3000)

            }
        }else{
          this.master.toastMensaje(this.message['validar3'],3000)
        }
      }else{
        this.master.toastMensaje(this.message['validar4'],3000)
      }
    }else{
      this.master.toastMensaje(this.message['validar5'],3000)
    }
  }
  limpiarData(){
    this.DataForm={
      observaciones:'',
      fecha:new Date().toString(),
      empresa:null,
      granja:null,
      responsable:null
    }
    this.granjaprincipal={}
    this.lotestotal=0
    this.cantidadtotal=0
    this.kilostotal=0
    this.granjas=[]
    this.listmortalidad=[]
    this.responsables=[]
    this.colocarTotales()
  }
seguir(){
  this.master.Load(this.loadingController).then(()=>{
    this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((Usuario)=>{
      let id=Usuario[0]['Cedula']
      let valor=this.master.mortalidadt.mortalidad
      valor.FECHA=formatDate(new  Date(this.DataForm.fecha) , 'yyyy-MM-dd', 'en')
      valor.IDEMP=this.DataForm.empresa['IDEMP']
      valor.IDGRA=this.DataForm.granja['IDGRA']
      valor.OBSERVA=this.DataForm.observaciones
      valor.RESPONSABLE=this.DataForm.responsable['COD']
      valor.detallejson=JSON.stringify(this.listmortalidad)
      valor.USUARIO=id
        this.master.mortalidadt.postnewregistromortalidad(valor).then((NewMortalidad)=>{
          let ReporteGen=this.master.storage.vacunareporte
          ReporteGen.ReporteInicial=valor
          ReporteGen.enviado=false
          if(!NewMortalidad['correcto'] && NewMortalidad['data']['status']==-1){
            this.GuardarRegistroDeReportes(ReporteGen,false,false)
            this.loadingController.dismiss()
            this.limpiarData()
          }else{
            if(NewMortalidad['correcto']){
              ReporteGen.dataEnviado=NewMortalidad['data']
              ReporteGen.enviado=true
              this.GuardarRegistroDeReportes(ReporteGen,true,false)
              this.loadingController.dismiss()
              this.limpiarData()
            }else if(NewMortalidad['correcto'] && NewMortalidad['mensaje']=="errorapi"){ 
              ReporteGen.enviado=true
              ReporteGen.dataEnviado=NewMortalidad['data']
              this.GuardarRegistroDeReportes(ReporteGen,true,true)
              this.loadingController.dismiss()
              this.limpiarData()
            }else{
              this.GuardarRegistroDeReportes(ReporteGen,false,true)
              this.loadingController.dismiss()
              this.limpiarData()
            }
          }
        })
      })
  })

}
GuardarRegistroDeReportes(Report,Enviado,Erroes){
  this.master.storage.getItems(this.master.storage.arrayname.repMortalidd).then((Info)=>{
    let Registros=[]
    if(Info){
     Registros=Info[0]
    }
    this.master.storage.DeleteKey(this.master.storage.arrayname.repMortalidd).then(()=>{
      let array=Registros
      let valor=array.push(Report)
      this.master.storage.addItem(this.master.storage.arrayname.repMortalidd,array).then(()=>{
        if(Enviado){
          this.limpiarData()
          this.master.MensajeAlert(this.message['guardado1']+" "+Report.dataEnviado.Principal.NORC,this.message['guardadotitle'])
        }else{
          this.limpiarData()
          this.master.MensajeAlert(this.message['guardado2'],this.message['guardadotitle'])
        }
      })
    })
  })
}

    ngOnInit() {
      this.translate.get("mortalidad").subscribe(dataTranslate=>{
        this.message=dataTranslate
       })
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
  checkGranja(){
    let valor = false
    if(this.granjaprincipal.IDGRA){
      if(this.granjaprincipal.IDGRA===this.DataForm.granja['IDGRA']){
        valor=true
      }
    }
    return valor
  }

  async seguiralModal(numero){
    this.master.storage.DeleteKey("valorretornomortalidad").then(()=>{
      this.master.storage.addItem("valorretornomortalidad", this.listmortalidad).then(async ()=>{
          const modal=await this.modalController.create({
            component:MortalidadregPage,
            componentProps:{
              idgranja:this.DataForm.granja['IDGRA'],
              idempresa:this.DataForm.empresa['IDEMP'],
              indexnumero:numero
            }
          });
          modal.onDidDismiss().then((detalles)=>{
            this.master.storage.getItems("valorretornomortalidad").then((datos)=>{
              if(datos){
                if(datos.length>0){
                  this.granjaprincipal=JSON.parse(JSON.stringify(this.DataForm.granja))
                  this.listmortalidad=datos[0]
                  this.colocarTotales()
                }
              }
            })
          })
          return await modal.present()
      })
    })
  }
  async iralmodal(numero){
    if(this.listmortalidad.length===0){
      this.seguiralModal(numero)
    }else{
      if(this.checkGranja()){
        this.seguiralModal(numero)
      }else{
        this.master.toastMensaje(this.message['irmodal'],3000)
      }
    }
  }
  async irAConsumos(){
    if(this.DataForm.granja){
      if(this.DataForm.empresa){
          this.iralmodal(-1)
        }else{
          this.master.toastMensaje(this.message['irconsumos1'],4000)
        }
    }else{
      this.master.toastMensaje(this.message['irconsumos2'],4000)
    }
  }
  edit(numero){
    this.iralmodal(numero)

  }
  borrar(numero){
    
    console.log(this.listmortalidad.splice(numero,1))
    this.colocarTotales()
  }
  colocarTotales()  {
    this.lotestotal=this.listmortalidad.length
    this.cantidadtotal=0
    this.kilostotal=0
    this.listmortalidad.forEach((valorList)=>{
      this.cantidadtotal=this.cantidadtotal+((valorList.CANTAM*1)+(valorList.CANTPM*1))
      this.kilostotal=this.kilostotal+((valorList.KILOSAM*1)+(valorList.KILOSPM*1))
    })
  }
}
