import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
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
    LotesEMP:'',
    cantidad:'',
    espacios:null,
    materia:null,
    LoteSelec:null
  }
  idgranjas=0
  idempresas=0
  idindex=-1
  espaciosprod=[]
  materias=[]
  listConsumos=[]
  Lote=[]
  message=[]
  constructor(private master:MasterService,private translate:TranslateService,private loadingController:LoadingController,private modalController:ModalController,
    navParams: NavParams) {
      this.translate.get("modalmateriasconsumo").subscribe(dataTranslate=>{
        this.message=dataTranslate
       })
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
              ID:valor.COD,
              NOMBRE:valor.NOMBRE+(valor.TIPOCOSTO?"-"+valor.TIPOCOSTO:"")
            })
          })
        }
      })
      this.agregarValorAlista()
   }
   changedecimal(ev){
    this.DataForm.cantidad=parseFloat(this.DataForm.cantidad).toFixed(3)
   }
   BuscarDieta(){
    this.master.Load(this.loadingController).then(()=>{
      this.master.consumos.getConsultaDieta(this.idempresa,this.idgranja,this.DataForm.espacios.COD).then((dato)=>{

        this.loadingController.dismiss()
        if(dato.correcto){
          var datoIndex=this.listConsumos.filter(datoFind=>datoFind.CODESPA ===this.DataForm.espacios.COD).length;
            console.log(dato)
          if(dato.data.consultadieta.length>0){            
            this.DataForm.cantidad=dato.data.consultadieta[datoIndex].CANTIDAD
           var ProductoMate= this.materias.find(datoMateria=>datoMateria.ID===dato.data.consultadieta[datoIndex].PRODUCTO)
            if(ProductoMate){
              this.DataForm.materia=ProductoMate
            }
          }
          
        }else{
          if(dato.data.status===-6){
            this.master.toastMensaje(this.message['internetfail'],3000)
          }

        }
      })
    })
   }
   agregarotro(){
    this.DataForm.cantidad=parseFloat(this.DataForm.cantidad).toFixed(3)
    if(parseFloat(this.DataForm.cantidad)>=0){
      if(Number(this.DataForm.Lotes)>0){
        if(this.DataForm.materia){
          if(this.DataForm.espacios){
            if(this.Lote.length>0){
              if(this.DataForm.LoteSelec){
                if(!this.DataForm.LotesEMP || this.DataForm.LotesEMP.length<=30){
                  this.agregarValor()
                }else{
                  this.master.toastMensaje(this.message['agregarotro6'],3000)

                }
              }else{
                this.master.toastMensaje(this.message['agregarotro1'],3000)
              }
            }else{
              this.agregarValor()
            }
          }else{
            this.master.toastMensaje(this.message['agregarotro2'],3000)
          }
        }else{
          this.master.toastMensaje(this.message['agregarotro3'],3000)
          
        }
      }else{
        this.master.toastMensaje(this.message['agregarotro4'],3000)

      }
    }else{
      this.master.toastMensaje(this.message['agregarotro5'],3000)

    }
   }
  finalizar(){
    this.modalController.dismiss()
  }
  agregarValor(){
    if(this.idindex>=0){
      this.listConsumos[this.idindex]={
        CODESPA:this.DataForm.espacios['COD'],
        LOTE:this.DataForm.Lotes,
        CANTIDAD:this.DataForm.cantidad,
        LOTEMP:this.DataForm.LotesEMP,
        CODIGO:this.DataForm.materia['ID'],
        OBSERVA:this.DataForm.observaciones,
        INFODATA:{
          observaciones:this.DataForm.observaciones,
          Lotes:this.DataForm.Lotes,
          LotesEMP:this.DataForm.LotesEMP,
          cantidad:this.DataForm.cantidad,
          espacios:this.DataForm.espacios,
          materia:this.DataForm.materia,
          LoteSelec:this.DataForm.LoteSelec
        }
      }
      this.idindex=-1;
    }else{
      this.listConsumos.push({
        CODESPA:this.DataForm.espacios['COD'],
        LOTE:this.DataForm.Lotes,
        CANTIDAD:this.DataForm.cantidad,
        LOTEMP:this.DataForm.LotesEMP,
        CODIGO:this.DataForm.materia['ID'],
        OBSERVA:this.DataForm.observaciones,
        INFODATA:{
          observaciones:this.DataForm.observaciones,
          Lotes:this.DataForm.Lotes,
          LotesEMP:this.DataForm.LotesEMP,
          cantidad:this.DataForm.cantidad,
          espacios:this.DataForm.espacios,
          materia:this.DataForm.materia,
          LoteSelec:this.DataForm.LoteSelec
        }
      })
    }
    this.master.storage.DeleteKey("valorRetrnomateriaconsumos").then(()=>{
      this.master.storage.addItem("valorRetrnomateriaconsumos",this.listConsumos).then(()=>{
        this.DataForm.Lotes="";
          this.DataForm.LotesEMP="";
        this.DataForm.cantidad="";
        this.DataForm.espacios=null;
        this.DataForm.materia=null;
        this.DataForm.LoteSelec=null;
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
              this.DataForm.LoteSelec=datos[0][this.idindex].INFODATA.LoteSelec
              this.DataForm.LotesEMP=datos[0][this.idindex].INFODATA.LotesEMP
              
              this.showAllSelect()
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
    let espacios=evento.value['COD']
    this.master.storage.getItems(this.master.storage.arrayname.espacioLotesDiferentes).then((datos)=>{
      let datoss=datos[0].filter(dato=>Number(dato.IDEMP)===Number(this.idempresas) && Number(dato.IDGRA)===Number(this.idgranjas) && dato.COD===espacios)
      this.Lote=[]
      if(datoss.length>1){
        this.DataForm.LoteSelec=null
        this.Lote=datoss
      }else{
        if(datoss.length===0){
          this.master.toastMensaje(this.message['espacionnolotes'],3000)
          this.Lote=datoss
          this.DataForm.LoteSelec=null
          this.DataForm.Lotes="0"
        }else{
          this.Lote=datoss
          this.DataForm.LoteSelec=datoss[0]
          this.DataForm.Lotes=datoss[0]['LOTE']?datoss[0]['LOTE']:0
          
        }
      }
    })
  }
  showAllSelect(){
    let espacios=this.DataForm.espacios['COD']
    this.master.storage.getItems(this.master.storage.arrayname.espacioLotesDiferentes).then((datos)=>{
      let datoss=datos[0].filter(dato=>Number(dato.IDEMP)===Number(this.idempresas) && Number(dato.IDGRA)===Number(this.idgranjas) && dato.COD===espacios)
      this.Lote=[]
      if(datoss.length>1){
        this.Lote=datoss
      }else{
        if(!datoss[0]['LOTE']){
          this.master.toastMensaje(this.message['espacionnolotes'],3000)
          this.Lote=datoss
        }else{
          this.Lote=datoss
        }
      }
    })
  }
  changelotes(evento){
    if(!evento.value['LOTE']){
      this.master.toastMensaje(this.message['espacionnolotes'],3000)
    }
    this.DataForm.Lotes=evento.value['LOTE']?evento.value['LOTE']:0
    console.log(evento)
  }
  changematerias(evento){
    let materias=evento.value['IDGRA']
  }
}
