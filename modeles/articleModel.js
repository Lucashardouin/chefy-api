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

  static async update(id_article, updatedArticle) {
    try {
      const fields = Object.getOwnPropertyNames(updatedArticle);
      const placeholders = fields.map((field) => `${field} = ?`).join(", ");
      const values = Object.values(updatedArticle);
      values.push(id_article);
  
      const sql = await pool.getConnection();
      const result = await sql.query(
        `UPDATE articles SET ${placeholders} WHERE id_articles = ?`,
        values
      );
      sql.release();
      return result;
    } catch (error) {
      throw error;
    }
  }
  

  static async findAll() {
    try {
      const sql = await pool.getConnection();
      const result = await sql.query(`SELECT * FROM articles`);
      sql.release();
      return result.length > 0 ? result : null;
    } catch (error) {
      throw error;
    }
  }

  static async remove(id) {
    try {
      const sql = await pool.getConnection();
      const query = "DELETE FROM articles WHERE id_articles = ?";
      const result = await sql.query(query, [id]);
      sql.release();

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Article;
