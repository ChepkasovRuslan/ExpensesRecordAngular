import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-delete-expense-modal',
  templateUrl: './delete-expense-modal.component.html',
  styleUrls: ['./delete-expense-modal.component.css'],
})
export class DeleteExpenseModalComponent {
  constructor(
    private httpService: HttpService,
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<DeleteExpenseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  submitDelete() {
    this.httpService
      .deleteExpense(this.data)
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
