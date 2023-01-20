import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { Expense } from './interfaces/expense.interface';
import { Result } from 'express-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  title = 'ExpensesRecordAngular';

  totalSum = 0;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getTotalSum().subscribe(result =>
      this.totalSum = result.totalSum);
  }
}
