import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { MenuPage } from 'src/app/menu/menu.page';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-materiasconsumoreg',
  templateUrl: './materiasconsumoreg.page.html',
  styleUrls: ['./materiasconsumoreg.page.scss'],
})
export class MateriasconsumoregPage implements OnInit {
  @Input() public idgranja: any
  @Input() public idempresa: any
  @Input() public indexnumero: any
  DataForm={
    observaciones:'',
    Lotes:'',
    cantidad:'',
    espacios:null,
    materia:null
  }
  idgranjas=0
  idempresas=0
  idindex=-1
  espaciosprod=[]
  materias=[]
  listConsumos=[]
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,
    navParams: NavParams) {
      if(navParams.get('idempresa')){
        this.idempresas=navParams.get('idempresa')
      }
      if(navParams.get('idgranja')){
        this.idgranjas=navParams.get('idgranja')
        
      }
      if(navParams.get('indexnumero')>=0){
        this.idindex=navParams.get('indexnumero')
      }
       this.master.storage.getItems(this.master.storage.arrayname.EspaciosByCod).then((DataEspacios)=>{
      let espacioss=[]
      if(DataEspacios){
        for(let i=0;i<DataEspacios[0].length;i++){
          if(DataEspacios[0][i]['IDEMP']== this.idempresas && DataEspacios[0][i]['IDGRA']==this.idgranjas){
            let val=espacioss.push(DataEspacios[0][i])
          }
        }
        this.espaciosprod=espacioss
      }
    })
      this.master.storage.getItems(this.master.storage.arrayname.Materias).then((datamateria)=>{
        let espacioss=[]
        if(datamateria){
          this.materias=datamateria[0].map((valor)=>{
            return({
              ID:valor.ID,
              NOMBRE:valor.NOMBRE+"-"+valor.TIPOCOSTO
            })
          })
        }
      })
      this.agregarValorAlista()
   }
   agregarotro(){
    if(Number(this.DataForm.cantidad)>0){
      if(Number(this.DataForm.Lotes)>0){
        if(this.DataForm.materia){
          if(this.DataForm.espacios){
    this.agregarValor()
          }else{
            this.master.toastMensaje("es necesario un Espacio",3000)
          }
        }else{
          this.master.toastMensaje("es necesario una Materia",3000)
          
        }
      }else{
        this.master.toastMensaje("Lotes debe ser Mayor a 0",3000)

      }
    }else{
      this.master.toastMensaje("la cantidad debe ser Mayor a 0",3000)

    }
   }
  finalizar(){
    
    if(Number(this.DataForm.cantidad)>0){
      if(Number(this.DataForm.Lotes)>0){
        if(this.DataForm.materia){
          if(this.DataForm.espacios){
            
            this.modalController.dismiss()
            this.agregarValor()
          }else{
            this.master.toastMensaje("es necesario un Espacio",3000)
          }
        }else{
          this.master.toastMensaje("es necesario una Materia",3000)
          
        }
      }else{
        this.master.toastMensaje("Lotes debe ser Mayor a 0",3000)

      }
    }else{
      this.master.toastMensaje("la cantidad debe ser Mayor a 0",3000)

    }
  }
  agregarValor(){
    if(this.idindex>=0){
      this.listConsumos[this.idindex]={
        CODESPA:this.DataForm.espacios['COD'],
        LOTE:this.DataForm.Lotes,
        CANTIDAD:this.DataForm.cantidad,
        LOTEMP:this.DataForm.Lotes,
        CODIGO:this.DataForm.materia['ID'],
        OBSERVA:this.DataForm.observaciones,
        INFODATA:this.DataForm
      }
      this.idindex=-1;
    }else{
      this.listConsumos.push({
        CODESPA:this.DataForm.espacios['COD'],
        LOTE:this.DataForm.Lotes,
        CANTIDAD:this.DataForm.cantidad,
        LOTEMP:this.DataForm.Lotes,
        CODIGO:this.DataForm.materia['ID'],
        OBSERVA:this.DataForm.observaciones,
        INFODATA:this.DataForm
      })
    }
    this.master.storage.DeleteKey("valorRetrnomateriaconsumos").then(()=>{
      this.master.storage.addItem("valorRetrnomateriaconsumos",this.listConsumos).then(()=>{
        this.DataForm.Lotes="";
        this.DataForm.cantidad="";
        this.DataForm.espacios=null;
        this.DataForm.materia=null;
        this.DataForm.observaciones="";
      })
    })
  }
  agregarValorAlista(){
      this.master.storage.getItems("valorRetrnomateriaconsumos").then((datos)=>{
        if(datos){
          if(datos.length>0){
            this.listConsumos=datos[0]
            if(this.idindex>=0){
              this.DataForm.Lotes=datos[0][this.idindex].INFODATA.Lotes
              this.DataForm.cantidad=datos[0][this.idindex].INFODATA.cantidad
              this.DataForm.espacios=datos[0][this.idindex].INFODATA.espacios
              this.DataForm.materia=datos[0][this.idindex].INFODATA.materia
              this.DataForm.observaciones=datos[0][this.idindex].INFODATA.observaciones
            }
          }
        }
      })
  }
  ngOnInit() {
  }
  onOpen(evento){
     this.master.storage.getItems(this.master.storage.arrayname.EspaciosByCod).then((DataEspacios)=>{
    let espacioss=[]
    if(DataEspacios){
      for(let i=0;i<DataEspacios[0].length;i++){
        if(DataEspacios[0][i]['IDEMP']== this.idempresas && DataEspacios[0][i]['IDGRA']==this.idgranjas){
          let val=espacioss.push(DataEspacios[0][i])
        }
      }
      this.espaciosprod=espacioss
    }
  })
  }
  changeespacios(evento){
    let espacios=evento.value['IDEMP']
    this.DataForm.Lotes=evento.value['LOTE']?evento.value['LOTE']:0
  }
  changematerias(evento){
    let materias=evento.value['IDGRA']
  }
}
