import { Component, ViewChild } from '@angular/core';
import { DashboardService } from './service/dashboard.service';
import { Balance } from './IfElse';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})
export class AppComponent {
  //@ViewChild(MatTable) mytable: MatTable<Article>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  title = 'cloudeProject';
  ifelse1: Balance[] = [];
  ifElse:any;
  totalBalance:any;
  monthlyPayment:any;
  Transactions:any;
  income:any;
  expense:any;
  investment:any;
  errorMessage="";
  now:Date;
  date:string;
  time:string;
  color = '#F7F7F7'
  disableSelect = new FormControl(false);
  selected = 'option2';
  Highcharts: typeof Highcharts = Highcharts;
 // highcharts = Highcharts;
  updateFlag = false;
  
 data=[{
  name: 'Income',
  data: [40, 35, 45, 45, 30, 35, 50,
     45, 35, 30, 40, 35],
     color:' #b9b9c6'
}, 
{
  name: 'Investment',
  data: [10, 5, 10, 15, 10, 10, 15, 10,
     20,10, 15, 20],
     color: '#73738c'
}, 
{
  name: 'Expense',
  data: [30, 30, 35,30, 25, 20, 25, 30,
     25, 30, 30, 25],
     color:'#505062'
}, 

]

   chartOptions : Highcharts.Options = {   
      chart: {
         type: 'column'
      },
      title: {
        text: ''
      },
      xAxis:{
         categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul',
         'Aug','Sep','Oct','Nov','Dec'],
         crosshair: true        
      },     
      yAxis : {
         min: 0,
         max:50,
         crosshair: true,
         tickPositions: [0, 10, 20,30,40,50],
         labels: {
          format: '${text}K' 
      },
     
          
      },
      tooltip : {
         headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
         pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
            '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
      },
      plotOptions : {
         column: {
            pointPadding: 0.2,
            borderWidth: 0
         }
      },
      series: this.data as Highcharts.SeriesOptionsType[]
   };

 
  columns: string[] = ['date','name','status','type','time','amount','action'];
  

  constructor(
    private dashboardService: DashboardService
    ) {}

    
  ngOnInit() {
    this.ifElse = this.dashboardService.getAll().subscribe(
      ifelsedata=> {
        this.ifElse = ifelsedata;
        this.ifelse1 = this.ifElse.balance;
        this.Transactions= this.ifElse.transactions;
        this.totalBalance= this.ifElse.balance.total_balance;
        this.monthlyPayment = this.ifElse.balance.monthly_payment_limit;
        this.income=this.ifElse.money_statistics.total_income;
        this.expense=this.ifElse.money_statistics.total_expense;
        this.investment=this.ifElse.money_statistics.total_investment;
        
        this.Transactions = new MatTableDataSource(this.ifElse.transactions);
        this.Transactions.sort = this.sort;
        
      },
      
      error => {
        this.errorMessage = error;
      }
    );
   
   }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.Transactions.filter = filterValue.trim().toLowerCase();
}

   onClick(name:any,type:any)
  {
    alert('Name: ' + name + '\n '+'Type:' + type)
  }

//   myYAxisTickFormatting(val:any) {
//     return '$' + val;
// }

  
}
