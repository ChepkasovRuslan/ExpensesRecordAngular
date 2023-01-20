import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Expense } from "../interfaces/expense.interface";
import { TotalSum } from "../interfaces/total-sum.interface";


@Injectable()
export class HttpService {
  URL = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getAllExpenses = (): Observable<Expense[]> => this.http.get<Expense[]>(this.URL + '/expenses');

  getTotalSum = (): Observable<TotalSum> => this.http.get<TotalSum>(this.URL + '/expenses/sum');

  createExpense = (body: Expense): Observable<Expense> => this.http.post<Expense>(this.URL + '/expenses', body);

  updateExpense = (id: string, body: Expense): Observable<Expense> => this.http.patch<Expense>(this.URL + '/expenses/' + id, body);

  deleteExpense = (id: string): Observable<any> => this.http.delete<Expense>(this.URL + '/expenses/' + id);
}