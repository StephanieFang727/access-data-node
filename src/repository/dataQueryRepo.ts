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
    console.log(
      `SELECT ${select_d.join(", ")},  ${transform(select_m).join(", ")} 
      FROM ${database} 
      GROUP BY ${select_d.join(", ")}`
    );
    const [rows] = await pool.query(
      `SELECT ${select_d.join(", ")},  ${transform(select_m).join(", ")} 
        FROM ${database} 
        GROUP BY ${select_d.join(", ")}`
    );
    return rows;
  }
}
