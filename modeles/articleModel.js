const mariadb = require("mariadb");
const pool = require("../config/db");

class Article {
  static async create(newArticle) {
    try {
      const fields = Object.getOwnPropertyNames(newArticle);
      const placeholders = Array(fields.length).fill("?").join(", ");
      const values = Object.values(newArticle);
      const sql = await pool.getConnection();
      const result = await sql.query(
        `INSERT INTO articles (${fields}) VALUES (${placeholders})`,
        values
      );
      sql.release();
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Article;
