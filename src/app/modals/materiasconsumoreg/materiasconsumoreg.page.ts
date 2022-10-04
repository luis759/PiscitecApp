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
  DataForm={
    observaciones:'',
    Lotes:'',
    cantidad:'',
    espacios:null,
    materia:null
  }
  idgranjas=0
  idempresas=0
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
       this.master.storage.getItems(this.master.storage.arrayname.EspaciosByCod).then((DataEspacios)=>{
        console.log(DataEspacios)
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
    this.listConsumos.push({
      CODESPA:this.DataForm.espacios['COD'],
      LOTE:this.DataForm.Lotes,
      CANTIDAD:this.DataForm.cantidad,
      LOTEMP:this.DataForm.Lotes,
      CODIGO:this.DataForm.materia['COD'],
      OBSERVA:this.DataForm.observaciones
    })
    console.log(this.listConsumos)
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

  }
  changematerias(evento){
    let materias=evento.value['IDGRA']
  }
}
