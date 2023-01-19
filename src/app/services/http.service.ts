import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Expense } from "../models/expense.model";


@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  getAllExpenses = (): Observable<Expense> => {
    return this.http.get('http://localhost:8000/expenses').pipe(map((result: Expense) => {
      return result;
    }))
  }
}