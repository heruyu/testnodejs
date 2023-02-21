import { reduce } from "lodash";
import { Database } from "sqlite3";
import { Recipe } from "../types/recipe";
import { generateId } from "./id";

export class DB {
  db: Database;

  constructor(filename: string) {
    this.db = new Database(filename);
  }

  async query<T>(tableName: string, filters: Record<string, unknown>): Promise<Array<T>> {
    const sql = reduce(
      filters,
      (acc, value, key) => ({
        statements: [...acc.statements, key + " = $" + key],
        params: {
          ...acc.params,
          [`$${key}`]: value,
        },
      }),
      { statements: [], params: {} },
    );
    //console.log(filters);
    const sqlQuery =
      "select * from " + tableName + " where " + sql.statements.join(" and ");

    //console.log(sql);
    const results: Promise<Array<T>> = new Promise((res, rej) => {
      this.db.all(sqlQuery, sql.params, (error, rows) => {
        if (error) rej(error);
        else res(rows);
      });
    });

    const res = await results;

    console.log(res);

    return res;
  }

  async add(tableName: string, input: Recipe): Promise<Recipe> {
    const date = new Date();
    date.setHours(0,0,0,0);
    const sql = reduce(
      { id: generateId(), createdDate: date.toISOString().slice(0,10), ...input },
      (acc, value, key) => ({
        columns: [...acc.columns, key],
        params: {
          ...acc.params,
          [`$${key}`]: value,
        },
      }),
      { columns: [], params: {} },
    );
    //console.log(sql);
    const sqlQuery =
      "insert into " +
      tableName +
      " (" +
      sql.columns.join(", ") +
      " )" +
      "values (" +
      sql.columns.map((c) => `$${c}`).join(", ") +
      " )";
    //console.log(sqlQuery);
    const result = new Promise((res, rej) => {
      this.db.run(sqlQuery, sql.params, (error, rows) => {
        if (error) rej(error);
        else res(rows);
      });
    });

    console.log(await result);

    return (await result) as Recipe;
  }
}
