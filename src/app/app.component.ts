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
  title = 'ExpensesRecordAngular';

  displayedColumns: string[] = ['index', 'description', 'date', 'sum'];
  dataSource: MatTableDataSource<Expense> = new MatTableDataSource<Expense>();
  totalSum = 0;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getAllExpenses().subscribe(result =>
      this.dataSource = new MatTableDataSource<Expense>(result));

    this.httpService.getTotalSum().subscribe(result =>
      this.totalSum = result.totalSum);
  }
}
