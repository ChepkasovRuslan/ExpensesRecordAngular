import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Expense } from "../models/expense.model";


@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }
}