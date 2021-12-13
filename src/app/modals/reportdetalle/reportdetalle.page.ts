import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-reportdetalle',
  templateUrl: './reportdetalle.page.html',
  styleUrls: ['./reportdetalle.page.scss'],
})
export class ReportdetallePage implements OnInit {
  @Input() public detalles: any
  @Input() public idEmpresa: any
  @Input() public idGranja: any
  detalle=[{
    id:1,
    pesototal:'',
    CantidadAnimales:'',
    pesoprom:'',
    largo:'',
    alto:'',
    sexo:'',
    especie:null
  }]
  DataForm={
    pesotota:{
      value:''
    },
    cantidadani:{
      value:''
    },
    pesoprom:{
      value:''
    },
    largo:{
      value:''
    },
    alto:{
      value:''
    },
    sexo:{
      value:""
    },
    especie:null
  }
  especies=[]
  ingreso=false;
  update=false;
  numberedit=0;
  idempresas='';
  idGranjas='';
  constructor(private modal:ModalController,
    navParams: NavParams,private platform:Platform,private master:MasterService,private routr:Router) {
     
  if(navParams.get('detalles')){
        this.detalle=navParams.get('detalles')
      }
      if(navParams.get('idEmpresa')){
        this.idempresas=navParams.get('idEmpresa')
      }
      if(navParams.get('idGranja')){
        this.idGranjas=navParams.get('idGranja')
      }
        this.master.storage.getItems(this.master.storage.arrayname.Especies).then((Especies)=>{
            if(Especies){
                    this.especies=Especies[0]
            }
        })
  }
  changeEspecies(evento){

  }
  borrar(numero){
    console.log(this.detalle.splice(numero,1))
  }
  edit(numero){
    this.DataForm.alto.value=this.detalle[numero].alto
    this.DataForm.cantidadani.value=this.detalle[numero].CantidadAnimales
    this.DataForm.especie=this.detalle[numero].especie
    this.DataForm.largo.value=this.detalle[numero].largo
    this.DataForm.pesoprom.value=this.detalle[numero].pesoprom
    this.DataForm.pesotota.value=this.detalle[numero].pesototal
    this.DataForm.sexo.value=this.detalle[numero].sexo
    this.numberedit=numero
    this.ingreso=true;
    this.update=true;
    this.master.toastMensaje("Edita el Registro",1000)
  }
  PesoPromedio(){
    if(parseFloat(this.DataForm.pesotota.value)>0 && parseFloat(this.DataForm.cantidadani.value)>0){
      this.DataForm.pesoprom.value=(Math.round(parseFloat(this.DataForm.pesotota.value)/ parseFloat(this.DataForm.cantidadani.value) * 100)/100 ).toString()
    }
  }
  CancelarEdit(){
    this.ingreso=false;
    this.update=false;
    this.numberedit=0;
    let val={
      pesotota:{
        value:''
      },
      cantidadani:{
        value:''
      },
      pesoprom:{
        value:''
      },
      largo:{
        value:''
      },
      alto:{
        value:''
      },
      sexo:{
        value:""
      },
      especie:null
    }
    this.DataForm=val
  }
  finalizarGuardado(){
    this.ingreso=false;
    this.update=false;
    this.numberedit=0;
    let val={
      pesotota:{
        value:''
      },
      cantidadani:{
        value:''
      },
      pesoprom:{
        value:''
      },
      largo:{
        value:''
      },
      alto:{
        value:''
      },
      sexo:{
        value:""
      },
      especie:null
    }
    this.DataForm=val
  }
  continuarGuardado(){
    let val={
      pesotota:{
        value:''
      },
      cantidadani:{
        value:''
      },
      pesoprom:{
        value:''
      },
      largo:{
        value:''
      },
      alto:{
        value:''
      },
      sexo:{
        value:""
      },
      especie:null
    }
    let detal={
      CantidadAnimales:this.DataForm.cantidadani.value,
      alto:this.DataForm.alto.value,
      especie:this.DataForm.especie,
      id:this.detalle.length+1,
      largo:this.DataForm.largo.value,
      pesoprom:this.DataForm.pesoprom.value,
      pesototal:this.DataForm.pesotota.value,
      sexo:this.DataForm.sexo.value
    }
    let valor=this.detalle.push(detal)
    this.DataForm=val
    this.master.toastMensaje("Guardado correctamente",1000)
  }
  ValidarInfo(Edit){
    if(this.DataForm.especie){
      if(this.DataForm.cantidadani.value){
        if(this.DataForm.pesotota.value){
          if(this.DataForm.pesoprom.value){
            if(parseFloat(this.DataForm.cantidadani.value)>=0){
              if(parseFloat(this.DataForm.pesotota.value)>=0){
                if(parseFloat(this.DataForm.pesoprom.value)>=0){
                  if(Edit){
                    this.GrabarEdit()
                  }else{
                    this.continuarGuardado()
                  }
                }else{
                  this.master.MensajeAlert("Peso Promedio debe ser mayor o igual a 0","Detalle Ingreso")
                }
              }else{
                this.master.MensajeAlert("Peso Total debe ser mayor o igual a 0","Detalle Ingreso")
              }
            }else{
              this.master.MensajeAlert("Cantidad Animal debe ser mayor o igual a 0","Detalle Ingreso")
            }
          }else{
        this.master.MensajeAlert("Debes colocar Peso Promedio","Detalle Ingreso")
          }
        }else{
        this.master.MensajeAlert("Debes colocar Peso Total","Detalle Ingreso")
        }
      }else{
        this.master.MensajeAlert("Debes colocar Cantidad de animales","Detalle Ingreso")
      }
    }else{
      this.master.MensajeAlert("Debes colocar una especie","Detalle Ingreso")
    }
  }
  GrabarEdit(){
    this.detalle[this.numberedit].CantidadAnimales=this.DataForm.cantidadani.value
    this.detalle[this.numberedit].alto=this.DataForm.alto.value
    this.detalle[this.numberedit].especie=this.DataForm.especie
    this.detalle[this.numberedit].largo=this.DataForm.largo.value
    this.detalle[this.numberedit].pesoprom=this.DataForm.pesoprom.value
    this.detalle[this.numberedit].pesototal=this.DataForm.pesotota.value
    this.detalle[this.numberedit].sexo=this.DataForm.sexo.value
    this.ingreso=false;
    this.update=false;
    this.numberedit=0;
    let val={
      pesotota:{
        value:''
      },
      cantidadani:{
        value:''
      },
      pesoprom:{
        value:''
      },
      largo:{
        value:''
      },
      alto:{
        value:''
      },
      sexo:{
        value:""
      },
      especie:null
    }
    this.DataForm=val
  }
  ngOnInit() {
  }
  ionViewWillLeave(){
    this.master.storage.DeleteKey(this.master.storage.arrayname.DetallePrueb).then(()=>{
      this.master.storage.addItem(this.master.storage.arrayname.DetallePrueb,this.detalle).then(()=>{

      })
    })
  }
  finalizar(){
    this.modal.dismiss(this.detalle).then(()=>{
    })
  }
  nuevoingreso(){
    this.ingreso=true;
  }
}
