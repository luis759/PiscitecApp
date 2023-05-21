import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-reportsaldo',
  templateUrl: './reportsaldo.page.html',
  styleUrls: ['./reportsaldo.page.scss'],
})
export class ReportsaldoPage implements OnInit {

  @Input() public Saldos: any
  Saldoss=[{
    id:1,
    saldo:'',
    especie:null
  }]
  DataForm={
    saldo:{
      value:''
    },
    especie:null
  }
  especies=[]
  ingreso=false;
  update=false;
  numberedit=0;
  message=[];
  constructor(private modal:ModalController,private translate:TranslateService,
    navParams: NavParams,private platform:Platform,private master:MasterService,private routr:Router) {
      this.translate.get("modalreportsaldo").subscribe(dataTranslate=>{
        this.message=dataTranslate
       })
  if(navParams.get('saldos')){
        this.Saldoss=navParams.get('saldos')
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
    console.log(this.Saldoss.splice(numero,1))
  }
  edit(numero){
    this.DataForm.saldo.value=this.Saldoss[numero].saldo
    this.DataForm.especie=this.Saldoss[numero].especie
    this.numberedit=numero
    this.ingreso=true;
    this.update=true;
    this.master.toastMensaje(this.message['editreg'],1000)
  }
  CancelarEdit(){
    this.ingreso=false;
    this.update=false;
    this.numberedit=0;
    let val={
      saldo:{
        value:''
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
      saldo:{
        value:''
      },
      especie:null
    }
    this.DataForm=val
  }
  continuarGuardado(){
    let val={
      saldo:{
        value:''
      },
      especie:null
    }
    let detal={
      especie:this.DataForm.especie,
      id:this.Saldoss.length+1,
      saldo:this.DataForm.saldo.value
    }
    let valor=this.Saldoss.push(detal)
    this.DataForm=val
    this.master.toastMensaje(this.message['guardado'],1000)
  }
  checkExistEspecies(id){
    let Retorno=false;
    for(let i =0;i<this.Saldoss.length;i++){
      if(this.Saldoss[i]['especie']['IDESP']==id){
        Retorno=true;
      }
    }
    return Retorno
  }
  ValidarInfo(Edit){
    if(this.DataForm.especie){
      if(this.DataForm.saldo.value){
                if(parseFloat(this.DataForm.saldo.value)>0){
                  if(this.checkExistEspecies(this.DataForm.especie['IDESP'])){
                    this.master.MensajeAlert(this.message['validar1'],this.message['validartitulo'])
                  }else{
                    if(Edit){
                      this.GrabarEdit()
                    }else{
                      this.continuarGuardado()
                    }
                  }
                  
                }else{
                  this.master.MensajeAlert(this.message['validar2'],this.message['validartitulo'])
                }
      }else{
        this.master.MensajeAlert(this.message['validar3'],this.message['validartitulo'])
      }
    }else{
      this.master.MensajeAlert(this.message['validar4'],this.message['validartitulo'])
    }
  }
  GrabarEdit(){
    this.Saldoss[this.numberedit].especie=this.DataForm.especie
    this.Saldoss[this.numberedit].saldo=this.DataForm.saldo.value
    this.ingreso=false;
    this.update=false;
    this.numberedit=0;
    let val={
      saldo:{
        value:''
      },
      especie:null
    }
    this.DataForm=val
  }
  ngOnInit() {
  }
  ionViewWillLeave(){
    this.master.storage.DeleteKey(this.master.storage.arrayname.DetallePrueb).then(()=>{
      this.master.storage.addItem(this.master.storage.arrayname.DetallePrueb,this.Saldoss).then(()=>{

      })
    })
  }
  finalizar(){
    this.modal.dismiss(this.Saldoss).then(()=>{
    })
  }
  nuevoingreso(){
    this.ingreso=true;
  }
}
