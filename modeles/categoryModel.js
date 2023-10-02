const mariadb = require("mariadb");
const pool = require("../config/db");

class Category {
  static async create(newCategory) {
    try {
      const fields = Object.getOwnPropertyNames(newCategory);
      const placeholders = Array(fields.length).fill("?").join(", ");
      const values = Object.values(newCategory);
      const sql = await pool.getConnection();
      console.log(
        `INSERT INTO category (${fields}) VALUES (${placeholders})`,
        values
      );
      const result = await sql.query(
        `INSERT INTO category (${fields}) VALUES (${placeholders})`,
        values
      );
      sql.release();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findAll(id_user) {
    try {
      const sql = await pool.getConnection();
      const result = await sql.query(
        `SELECT * FROM category WHERE id_user = ?`,
        [id_user]
      );
      sql.release();
      return result.length > 0 ? result : null;
    } catch (error) {
      throw error;
    }
  }

  static async remove(id) {
    try {
      const sql = await pool.getConnection();
      const query = "DELETE FROM category WHERE id_category = ?";
      const result = await sql.query(query, [id]);
      sql.release();

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Category;
