import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
import { ExpenseRaw } from 'src/app/interfaces/expense-raw.interface';
import { HttpService } from 'src/app/services/http.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-update-expense-modal',
  templateUrl: './update-expense-modal.component.html',
  styleUrls: ['./update-expense-modal.component.css'],
})
export class UpdateExpenseModalComponent {
  constructor(
    private httpService: HttpService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<UpdateExpenseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseRaw
  ) {}

  description = this.data.description;
  sum = this.data.sum;

  patchExpense() {
    this.httpService
      .updateExpense(this.data._id, {
        description: this.description,
        sum: this.sum,
      })
      .pipe(
        catchError((err: Error) => {
          this.snackBarService.showErrorSnack(err);
          return of({});
        })
      )
      .subscribe(() => this.close());
  }

  close() {
    this.dialogRef.close();
  }
}
