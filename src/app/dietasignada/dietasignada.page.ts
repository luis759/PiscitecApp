import { Component, OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dietasignada',
  templateUrl: './dietasignada.page.html',
  styleUrls: ['./dietasignada.page.scss'],
})
export class DietasignadaPage implements OnInit {
  empresas=[]
  granjas=[]
  materias=[]
  listadodeespacios=[]
  DataForm={
    empresa:null,
    granja:null
  }
  UltimaActualizacion=""
  constructor(private master:MasterService) { }

  ngOnInit() {
    this.master.storage.getItems(this.master.storage.arrayname.Empresas).then((Empresass)=>{
      if(Empresass){
       this.empresas=Empresass[0]
      }else{
       this.empresas=[]
      }
   })
   this.master.storage.getItems(this.master.storage.arrayname.ultimaActualizacion).then((Dato)=>{
    if(Dato){
      if(Dato.length>0){
        this.UltimaActualizacion=formatDate(Dato[0] , 'yyyy-MM-dd HH:mm:ss', 'en')
      }
    }
  })
  }
  changeEmpresas(evento){
    let idempres=evento.value['IDEMP']
    let mostrarGranjas=[]
    this.granjas=[]
    this.DataForm.granja=null
    this.listadodeespacios=[]
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
    this.listadodeespacios=[]
    this.master.storage.getItems(this.master.storage.arrayname.Materias).then((datamateria)=>{
      let espacioss=[]
      if(datamateria){
        this.materias=datamateria[0].map((valor)=>{
          return({
            ID:valor.COD,
            NOMBRE:valor.NOMBRE+(valor.TIPOCOSTO?"-"+valor.TIPOCOSTO:"")
          })
        })
        this.master.storage.getItems(this.master.storage.arrayname.ConsultaDieta).then((ConsultaDietas)=>{
          if(ConsultaDietas){
        this.listadodeespacios=ConsultaDietas[0].filter(datoB=>datoB.IDEMP==this.DataForm.empresa.IDEMP && datoB.IDGRA==idgranjas).map((datoIM)=>{
          
          let producto=this.materias.find(datofind=>datofind.ID==datoIM.PRODUCTO).NOMBRE
          return({
            ...datoIM,
            productoname:producto
          })
        })
          }
        })
      }
    })
   
  }
}
