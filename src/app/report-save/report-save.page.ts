import { Component, NgZone, OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-report-save',
  templateUrl: './report-save.page.html',
  styleUrls: ['./report-save.page.scss'],
})
export class ReportSavePage implements OnInit {
messageLocal=[]
messageHome=[]
  constructor(private master:MasterService,private translate:TranslateService,
    private loadingController:LoadingController,private  ngZone:NgZone) { }

  ngOnInit() {
    this.translate.get("reportlist").subscribe(dataTranslate=>{
      this.messageLocal=dataTranslate
     })
     this.translate.get("home").subscribe(dataTranslate=>{
      this.messageHome=dataTranslate
     })
     
  }

}
