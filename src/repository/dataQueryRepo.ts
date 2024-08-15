import pool from "../config/mysql";

export class DataQueryRepository {
  //   async getAllUsers(): Promise<any[]> {
  //     const [rows] = await pool.query("SELECT * FROM users");
  //     return rows;
  //   }

  //   async getUserById(id: number): Promise<any> {
  //     const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  //     return rows[0];
  //   }

  //   async createUser(name: string, email: string): Promise<void> {
  //     await pool.query("INSERT INTO users (name, email) VALUES (?, ?)", [
  //       name,
  //       email,
  //     ]);
  //   }

  //   async updateUser(id: number, name: string, email: string): Promise<void> {
  //     await pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
  //       name,
  //       email,
  //       id,
  //     ]);
  //   }

  //   async deleteUser(id: number): Promise<void> {
  //     await pool.query("DELETE FROM users WHERE id = ?", [id]);
  //   }

  async dataQuery(
    database: string,
    select_d: string[],
    select_m: string[]
  ): Promise<any[]> {
    const transform = (arr: string[]) => {
      return arr.map((item: string) => `ROUND(SUM(${item}),2) AS ${item}`);
    };
    console.log(select_d, select_m);
    const selectedFields = select_d.concat(transform(select_m));
    let query = `SELECT ${selectedFields.join(", ")}
      FROM ${database} `;
    if (select_d.length) {
      query += `GROUP BY ${select_d.join(", ")}`;
    }
    console.log(query);
    const [rows] = await pool.query(query);
    return rows;
  }
}
