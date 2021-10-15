import { Component, OnInit } from '@angular/core';
import { Tasinmaz } from 'src/app/models/tasinmaz';
import { TasinmazService } from 'src/app/services/tasinmaz.service';

@Component({
  selector: 'app-tasinmaz',
  templateUrl: './tasinmaz.component.html',
  styleUrls: ['./tasinmaz.component.css']
})
export class TasinmazComponent implements OnInit {
  tasinmaz: Tasinmaz[]=[];
  currentTasinmaz:Tasinmaz;
  constructor(private tasinmazService:TasinmazService) { }

  ngOnInit() {
    this.getTasinmaz();
  }
  getTasinmaz(){
    this.tasinmazService.getTasinmaz().subscribe(response=>{
      this.tasinmaz=response.data
  })
}
setCurrentTasinmaz(tasinmaz:Tasinmaz){
  this.currentTasinmaz=tasinmaz;
}

getCurrentTasinmazClass(tasinmaz:Tasinmaz){
  if(tasinmaz==this.currentTasinmaz){
    return "list-group-item active"
  }
  else{
    return "list-group-item"
  }
}
getTasinmazByUser(uID:number){
  this.tasinmazService.getTasinmazByUser(uID).subscribe(response=>{
    this.tasinmaz=response.data
})
}

}
