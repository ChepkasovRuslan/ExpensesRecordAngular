import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpenseComponent } from './components/expense/expense.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SelectedExpenseComponent } from './components/selected-expense/selected-expense.component';
import { RedirectService } from './services/redirect.service';

const routes: Routes = [
  { path: '', component: ExpenseComponent },
  { path: ':id', component: SelectedExpenseComponent, canActivate: [RedirectService] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [ExpenseComponent, SelectedExpenseComponent, NotFoundComponent];
