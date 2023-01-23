import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpdateExpenseModalComponent } from './components/update-expense-modal/update-expense-modal.component';
import { MaterialModule } from './material/material.module';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [AppComponent, UpdateExpenseModalComponent],
  entryComponents: [UpdateExpenseModalComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule, MaterialModule],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
