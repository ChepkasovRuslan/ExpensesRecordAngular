import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteExpenseModalComponent } from './components/delete-expense-modal/delete-expense-modal.component';
import { UpdateExpenseModalComponent } from './components/update-expense-modal/update-expense-modal.component';
import { MaterialModule } from './material/material.module';
import { HttpService } from './services/http.service';
import { SnackBarService } from './services/snack-bar.service';

@NgModule({
  declarations: [AppComponent, UpdateExpenseModalComponent, routingComponents, DeleteExpenseModalComponent],
  entryComponents: [UpdateExpenseModalComponent],
  imports: [AppRoutingModule, BrowserModule, HttpClientModule, FormsModule, BrowserAnimationsModule, MaterialModule],
  providers: [HttpService, SnackBarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
