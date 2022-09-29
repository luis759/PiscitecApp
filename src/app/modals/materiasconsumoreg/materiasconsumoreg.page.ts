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
  @Input() public materiasprimas: any
  @Input() public espaciosproductivos: any
  DataForm={
    observaciones:'',
    Lotes:'',
    cantidad:'',
    espacios:null,
    materia:null
  }
  espaciosprod=[]
  materias=[]
  listConsumos=[
  {
    Lotes:10,
    Cantidad:10
  }
  ]
  consumosValores=[]
  constructor(private master:MasterService,private loadingController:LoadingController,private modalController:ModalController,
    navParams: NavParams) {
     if(navParams.get('materiasprimas')){
        this.materias=navParams.get('materiasprimas')
      }
      if(navParams.get('espaciosproductivos')){
        this.espaciosprod=navParams.get('espaciosproductivos')
      }
   }

  finalizar(){
    this.modalController.dismiss(this.consumosValores).then(()=>{
    })
  }
  ngOnInit() {
  }
  changeespacios(evento){
    let espacios=evento.value['IDEMP']

  }
  changematerias(evento){
    let materias=evento.value['IDGRA']
  }
}
