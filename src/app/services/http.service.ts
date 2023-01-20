import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Expense } from "../models/expense.model";


@Injectable()
export class HttpService {
  URL = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getAllExpenses = (): Observable<Expense> => {
    return this.http.get(this.URL + '/expenses').pipe(map((result: any) => {
      return result.map((item: any) => new Expense(item._id, item.description, item.sum, item.date));
    }));
  }

  createExpense = (body: Expense): Observable<Expense> => {
    return this.http.post(this.URL + '/expenses', body).pipe(map((result: any) => {
      return new Expense(result._id, result.description, result.sum, result.date);
    }));
  }
}