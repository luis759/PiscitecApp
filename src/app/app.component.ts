import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { MasterService } from './services/master.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform:Platform,private master:MasterService,private routr:Router,private NavController:NavController,private modal:ModalController) {

    this.platform.backButton.subscribe(() => {
      if(this.routr.url=="/login"){
        navigator['app'].exitApp();
      }else if(this.routr.url=="/load"){
        navigator['app'].exitApp();
      }else if(this.routr.url=="/menu/home"){
        navigator['app'].exitApp();
      }else if(this.modal.getTop()){

      }
    })
  }
}
