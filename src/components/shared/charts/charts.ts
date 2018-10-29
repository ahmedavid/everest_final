import { Component,Input, OnChanges } from '@angular/core';

@Component({
  selector: 'charts',
  templateUrl: 'charts.html'
})
export class ChartsComponent implements OnChanges {

  @Input('charts') charts;

  doughnutChart = [];
  lineCharts = [];

  constructor() {}

  ngOnChanges(){
    const donut = this.charts.filter( d => d.type === 'chart-pie');
    const line = this.charts.filter( d => d.type === 'chart-line');

    for(let m of this.charts){
    ///////if the data has a pie chart////////////
    if(m.type == "chart-pie"){
      let dchartColor = [];
      let dChartData=[];
      let dChartLabel=[];
      let title= m.title;
      let width=m.width;
      let is_default_open = m.is_default_open;
      let dChartColorBg=[];
      for(let i=0;i<m.content.length;i++){
        let d = m.content[i].percent;
        let l = m.content[i].title;
        let c = m.content[i].color;
        dchartColor.push(c);
        dChartData.push(d);
        dChartLabel.push(l);
      }
      dChartColorBg.push({'backgroundColor':dchartColor});
      this.doughnutChart.push({
        'color':dChartColorBg,
        'label':dChartLabel,
        'data':dChartData,
        'title':title,
        'width':width,
        'is_default_open':is_default_open
      });
      }

      ///////if data has line chart//////////////
      else if(m.type == "chart-line"){
        let title= m.title;
        let width=m.width;
        let is_default_open = m.is_default_open;
        let color=m.content[0].color;

          let lineData=[];
          let linelabel=[];
          let lineDataLabel=[];
          let lineDataColor=[];
          for(let i=0;i<m.content[0]['x-axis'].length;i++){
          let d = m.content[0].values[i][1];
          let l = m.content[0]['x-axis'][i].value;
          linelabel.push(l);
          lineData.push(d);
          }
          lineDataLabel.push({'data':lineData,'label':title});
          lineDataColor.push({'backgroundColor':color});
        this.lineCharts.push({'data':lineDataLabel,'labels':linelabel,'color':lineDataColor,'title':title,'width':width,'is_default_open':is_default_open});
      }
    }
  }
}
