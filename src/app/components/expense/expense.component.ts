import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of } from 'rxjs';

import { ExpenseRaw } from 'src/app/interfaces/expense-raw.interface';

import { SnackBarService } from 'src/app/services/snack-bar.service';

import { Expense } from '../../interfaces/expense.interface';
import { HttpService } from '../../services/http.service';

import { DeleteExpenseModalComponent } from '../delete-expense-modal/delete-expense-modal.component';
import { UpdateExpenseModalComponent } from '../update-expense-modal/update-expense-modal.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private snackBarService: SnackBarService,
    public editDialog: MatDialog,
    public deleteDialog: MatDialog
  ) {}

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
    this.refreshExpenses();
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
      .pipe(
        catchError((err: Error) => {
          this.snackBarService.showErrorSnack(err);
          return of({});
        })
      )
      .subscribe(() => {
        this.clearFields();
        this.refreshExpenses();
      });
  }

  deleteExpense(element: ExpenseRaw) {
    this.deleteDialog
      .open(DeleteExpenseModalComponent, {
        width: '250px',
        data: element._id,
      })
      .afterClosed()
      .subscribe(() => this.refreshExpenses());
  }

  clearFields() {
    this.description = '';
    this.sum = 0;
  }

  openEditDialog(element: ExpenseRaw) {
    this.editDialog
      .open(UpdateExpenseModalComponent, {
        width: '700px',
        data: {
          _id: element._id,
          description: element.description,
          sum: element.sum,
          date: element.date,
        },
      })
      .afterClosed()
      .subscribe(() => this.refreshExpenses());
  }

  refreshExpenses() {
    this.httpService
      .getAllExpenses()
      .pipe(
        catchError((err: Error) => {
          this.snackBarService.showErrorSnack(err);
          return of([]);
        })
      )
      .subscribe((result: Expense[]) => {
        this.totalSum = result.reduce((acc, obj) => acc + obj.sum, 0);
        this.dataSource = new MatTableDataSource<Expense>(result);
      });
  }
}
