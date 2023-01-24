import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseRaw } from 'src/app/interfaces/expense-raw.interface';

@Component({
  selector: 'app-selected-expense',
  templateUrl: './selected-expense.component.html',
  styleUrls: ['./selected-expense.component.css'],
})
export class SelectedExpenseComponent implements OnInit {
  expense: ExpenseRaw = {
    _id: '',
    description: '',
    sum: 0,
    date: '',
  };

  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.expense = window.history.state.expense;
  }
}
