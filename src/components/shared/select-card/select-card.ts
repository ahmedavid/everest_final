import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'select-card',
  templateUrl: 'select-card.html'
})
export class SelectCardComponent {

  @Input('container') container:{title:string,url:string,values:{text:string,value:string}[]};
  @Output('onChange') onChange = new EventEmitter<string>();

  constructor() {}

  change(event){
    this.onChange.emit(event);
  }

}
