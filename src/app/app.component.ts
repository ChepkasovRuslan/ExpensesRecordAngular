import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of } from 'rxjs';

import { UpdateExpenseModalComponent } from './components/update-expense-modal/update-expense-modal.component';
import { Expense } from './interfaces/expense.interface';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private httpService: HttpService, public dialog: MatDialog) {}

  public readonly displayedColumns: string[] = [
    'index',
    'description',
    'date',
    'sum',
    'updateExpense',
    'deleteExpense',
  ];
  public dataSource: MatTableDataSource<Expense> = new MatTableDataSource<Expense>();
  public totalSum = 0;

  public description = '';
  public sum = 0;

  ngOnInit() {
    this.refresh();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addExpense() {
    this.httpService
      .createExpense({
        description: this.description,
        sum: this.sum,
      })
      .subscribe(() => {
        this.clearFields();
        this.refresh();
      });
  }

  deleteExpense(element: any) {
    this.httpService.deleteExpense(element._id).subscribe(() => this.refresh());
  }

  clearFields() {
    this.description = '';
    this.sum = 0;
  }

  openEditDialog(element: any) {
    this.dialog
      .open(UpdateExpenseModalComponent, {
        width: '700px',
        data: {
          id: element._id,
          description: element.description,
          sum: element.sum,
        },
      })
      .afterClosed()
      .subscribe(() => this.refresh());
  }

  refresh() {
    this.httpService
      .getAllExpenses()
      .pipe(
        catchError(() => {
          this.totalSum = 0;
          this.dataSource = new MatTableDataSource<Expense>();

          return of([]);
        })
      )
      .subscribe((result: Expense[]) => {
        this.totalSum = result.reduce((acc, obj) => acc + obj.sum, 0);
        this.dataSource = new MatTableDataSource<Expense>(result);
      });
  }
}
