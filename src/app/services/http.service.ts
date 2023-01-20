import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Expense } from "../models/expense.model";


@Injectable()
export class HttpService {
  URL = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getAllExpenses = (): Observable<Expense[]> => this.http.get<Expense[]>(this.URL + '/expenses');

  createExpense = (body: Expense): Observable<Expense> => this.http.post<Expense>(this.URL + '/expenses', body);

}