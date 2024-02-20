import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages=[
    {
      title:'Principal',
      url:'/menu/home',
      icon:'assets/iconmenu/main.png',
      routerdi:'root',
      forw:false,
      function:''
    },{
      title:'Nuevo Responsables',
      url:'/menu/responsable',
      icon:'assets/iconmenu/profile.png',
      routerdi:'root',
      forw:false,
      function:''
    },{
      title:'Dieta Asignadas',
      url:'/menu/dietasignada',
      icon:'assets/dietas.png',
      routerdi:'root',
      forw:false,
      function:''
    },{
      title:'Reportes Enviados',
      url:'/menu/report-send',
      icon:'assets/saveicon.png',
      routerdi:'root',
      forw:false,
      function:''
    },{
      title:'Reportes Guardados',
      url:'/menu/report-save',
      icon:'assets/reporteguar.png',
      routerdi:'root',
      forw:false,
      function:''
    },{
      title:'Salir',
      url:'',
      icon:'assets/iconmenu/exit.png',
      routerdi:'root',
      forw:false,
      function:'logout'
    }    
]
message=[]
  constructor(private translate:TranslateService,private platform:Platform,private menus:MenuController,private master:MasterService,private nav:NavController) {
    this.translate.get("menu").subscribe(dataTranslate=>{
      this.message=dataTranslate
      this.pages[0].title=this.message['option1']
      this.pages[1].title=this.message['option2']
      this.pages[2].title=this.message['option6']
      this.pages[3].title=this.message['option3']
      this.pages[4].title=this.message['option4']
      this.pages[5].title=this.message['option5']
     })
   }

  ngOnInit() {
  }
  funcioneMenu(funcion){
    if(funcion=="logout"){
      this.logoutfuncion()
    }
  }
  logoutfuncion(){
    this.master.storage.DeleteKey(this.master.storage.arrayname.UsuarioActivo).then(()=>{
      this.nav.navigateRoot("login")
    })
  
  }
  activarmenuDesactivar(bool){
    this.menus.enable(bool)
  }
  funcioncerrar(){
    this.menus.close("first")
  } 
}
