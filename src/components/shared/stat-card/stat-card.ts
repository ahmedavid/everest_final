import { Component, Input } from '@angular/core';

@Component({
  selector: 'stat-card',
  templateUrl: 'stat-card.html'
})
export class StatCardComponent {
  @Input('title') title;
  @Input('stats') stats:{title:string,description:string,icon:string,width:number;color:string,url:string}[];

  constructor() {}

}
