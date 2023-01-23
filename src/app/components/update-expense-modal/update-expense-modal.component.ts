import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-update-expense-modal',
  templateUrl: './update-expense-modal.component.html',
  styleUrls: ['./update-expense-modal.component.css'],
})
export class UpdateExpenseModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateExpenseModalComponent>,
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  description = this.data.description;
  sum = this.data.sum;

  patchExpense() {
    this.httpService
      .updateExpense(this.data.id, {
        description: this.description,
        sum: this.sum,
      })
      .subscribe(() => this.close());
  }

  close() {
    this.dialogRef.close();
  }
}
