import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MenuPage } from '../menu/menu.page';
import { MateriasconsumoregPage } from '../modals/materiasconsumoreg/materiasconsumoreg.page';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-materiasconsumo',
  templateUrl: './materiasconsumo.page.html',
  styleUrls: ['./materiasconsumo.page.scss'],
})
export class MateriasconsumoPage implements OnInit {
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
  listConsumos=[]
  materias=[]
  granjaprincipal={} as any
  espaciosproductivos=[]
  lotestotal=0
  cantidadtotal=0
  message=[]
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,private menu:MenuPage,private translate:TranslateService) {
    this.translate.get("materiaconsumos").subscribe(dataTranslate=>{
      this.message=dataTranslate
     })
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
  checkGranja(){
    let valor = false
    if(this.granjaprincipal.IDGRA){
      if(this.granjaprincipal.IDGRA===this.DataForm.granja['IDGRA']){
        valor=true
      }
    }
    return valor
  }
  ValidarRegistro(){
    if(this.DataForm.empresa){
      if(this.DataForm.granja){
        if(this.DataForm.responsable){
            if(this.listConsumos.length>0){
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
    this.granjas=[]
    this.listConsumos=[]
    this.responsables=[]
    this.colocarTotales()
  }
seguir(){
  this.master.Load(this.loadingController).then(()=>{
    this.master.storage.getItems(this.master.storage.arrayname.UsuarioActivo).then((Usuario)=>{
      let id=Usuario[0]['Cedula']
      let valor=this.master.consumos.consumos
      valor.FECHA=formatDate(new  Date(this.DataForm.fecha) , 'yyyy-MM-dd', 'en')
      valor.IDEMP=this.DataForm.empresa['IDEMP']
      valor.IDGRA=this.DataForm.granja['IDGRA']
      valor.OBSERVA=this.DataForm.observaciones
      valor.RESPONSABLE=this.DataForm.responsable['COD']
      valor.detallejson=JSON.stringify(this.listConsumos)
      valor.USUARIO=id
        this.master.consumos.postnewregistroconsumos(valor).then((NewConsumos)=>{
          let ReporteGen=this.master.storage.vacunareporte
          ReporteGen.ReporteInicial=valor
          ReporteGen.enviado=false
          if(!NewConsumos['correcto'] && NewConsumos['data']['status']==-1){
            this.GuardarRegistroDeReportes(ReporteGen,false,false)
            this.loadingController.dismiss()
            this.limpiarData()
          }else{
            if(NewConsumos['correcto']){
              ReporteGen.dataEnviado=NewConsumos['data']
              ReporteGen.enviado=true
              this.GuardarRegistroDeReportes(ReporteGen,true,false)
              this.loadingController.dismiss()
              this.limpiarData()
            }else if(NewConsumos['correcto'] && NewConsumos['mensaje']=="errorapi"){ 
              ReporteGen.enviado=true
              ReporteGen.dataEnviado=NewConsumos['data']
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
  this.master.storage.getItems(this.master.storage.arrayname.repConsumos).then((Info)=>{
    let Registros=[]
    if(Info){
     Registros=Info[0]
    }
    this.master.storage.DeleteKey(this.master.storage.arrayname.repConsumos).then(()=>{
      let array=Registros
      let valor=array.push(Report)
      this.master.storage.addItem(this.master.storage.arrayname.repConsumos,array).then(()=>{
        if(Enviado){
          this.limpiarData()
          this.master.MensajeAlert(this.message['guardarmensaje1']+" "+Report.dataEnviado.Principal.NORC,this.message['guardarmensajetitulo'])
        }else{
          this.limpiarData()
          this.master.MensajeAlert(this.message['guardarmensaje2'],this.message['guardarmensajetitulo'])
        }
      })
    })
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
  async irAConsumos(){
    if(this.DataForm.granja){
      if(this.DataForm.empresa){
        this.iralmodal(-1)
        }else{
          this.master.toastMensaje(this.message['irconsumomensaje1'],4000)
        }
    }else{
      this.master.toastMensaje(this.message['irconsumomensaje2'],4000)
    }
   
  }
  async seguiralModal(numero){
    this.master.storage.DeleteKey("valorRetrnomateriaconsumos").then(()=>{
      this.master.storage.addItem("valorRetrnomateriaconsumos", this.listConsumos).then(async ()=>{
        const modal=await this.modalController.create({
          component:MateriasconsumoregPage,
          componentProps:{
            idgranja:this.DataForm.granja['IDGRA'],
            idempresa:this.DataForm.empresa['IDEMP'],
            indexnumero:numero
          }
        });
        modal.onDidDismiss().then((detalles)=>{
          this.master.storage.getItems("valorRetrnomateriaconsumos").then((datos)=>{
            if(datos){
              if(datos.length>0){
                this.granjaprincipal=JSON.parse(JSON.stringify(this.DataForm.granja))
                this.listConsumos=datos[0]
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
    if(this.listConsumos.length===0){
      this.seguiralModal(numero)
    }else{
      if(this.checkGranja()){
        this.seguiralModal(numero)
      }else{
        this.master.toastMensaje(this.message['modalmensaje'],3000)
      }
    }
  }
  edit(numero){
    this.iralmodal(numero)
  }
  borrar(numero){
    
    console.log(this.listConsumos.splice(numero,1))
    this.colocarTotales()
  }
  colocarTotales()  {
    this.lotestotal=this.listConsumos.length
     this.cantidadtotal=0
    this.listConsumos.forEach((valorList)=>{
      this.cantidadtotal=this.cantidadtotal+parseFloat(valorList.CANTIDAD)
    })
  }
}
