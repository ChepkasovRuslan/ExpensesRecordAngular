import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { Expense } from './interfaces/expense.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  constructor(private httpService: HttpService) { }

  displayedColumns: string[] = ['index', 'description', 'date', 'sum', 'deleteExpense'];
  dataSource: MatTableDataSource<Expense> = new MatTableDataSource<Expense>();
  totalSum = 0;

  description = '';
  sum = 0;

  ngOnInit() {
    this.refresh();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addExpense() {
    this.httpService.createExpense({
      description: this.description,
      sum: this.sum
    }).subscribe(_ => this.refresh());
  }

  deleteExpense(element: any) {
    this.httpService.deleteExpense(element._id)
      .subscribe(_ => this.refresh());
  }

  refresh() {
    this.httpService.getAllExpenses().subscribe(result =>
      this.dataSource = new MatTableDataSource<Expense>(result));

    this.httpService.getTotalSum().subscribe(result =>
      this.totalSum = result.totalSum);
  }
}
