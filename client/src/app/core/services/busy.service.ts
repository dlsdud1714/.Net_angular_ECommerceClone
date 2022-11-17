import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  BusyRequestCount =0;

  constructor(private spinnerService: NgxSpinnerService) {

   }
   busy(){
    this.BusyRequestCount ++;
    this.spinnerService.show(undefined, {
      type: 'timer',
      bdColor: 'rgba(255,255,255,0.7)',
      color:'#333333'
    })
   }
   idle(){
    this.BusyRequestCount--;
    if(this.BusyRequestCount<=0){
      this.BusyRequestCount=0;
      this.spinnerService.hide();
    }
   }
}
