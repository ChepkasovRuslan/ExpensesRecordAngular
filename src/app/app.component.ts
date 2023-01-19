import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { Expense } from './models/expense.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  title = 'ExpensesRecordAngular';

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getAllExpenses().subscribe(result => a.push(result));
  }
}
