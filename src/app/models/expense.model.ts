export class Expense {
  constructor(
    public id: string,
    public description: string,
    public sum: number,
    public date: string
  ) { }
}