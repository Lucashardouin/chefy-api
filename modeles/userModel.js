const mariadb = require("mariadb");
const pool = require("../config/db");

class User {
  static async create(newUser) {
    try {
      const fields = Object.getOwnPropertyNames(newUser);
      const placeholders = Array(fields.length).fill("?").join(", ");
      const values = Object.values(newUser);
      const sql = await pool.getConnection();
      const result = await sql.query(
        `INSERT INTO users (${fields}) VALUES (${placeholders})`,
        values
      );
      sql.release();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id_user) {
    try {
      const sql = await pool.getConnection();
      const result = await sql.query(`SELECT * FROM users WHERE id_user = ?`, [
        id_user,
      ]);
      sql.release();
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      throw error;
    }
  }

  static async findByUsername(username) {
    try {
      const sql = await pool.getConnection();
      const result = await sql.query(`SELECT * FROM users WHERE username = ?`, [
        username,
      ]);
      sql.release();
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const sql = await pool.getConnection();
      const result = await sql.query(`SELECT * FROM users WHERE email = ?`, [
        email,
      ]);
      sql.release();
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const sql = await pool.getConnection();
      const result = await sql.query(`SELECT * FROM users`);
      sql.release();
      return result.length > 0 ? result : null;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, updatedFields) {
    try {
      const sql = await pool.getConnection();
      const fieldsToUpdate = Object.keys(updatedFields);
      const fieldValues = fieldsToUpdate.map((field) => updatedFields[field]);

      // Construire la partie SET de la requête en fonction des champs à mettre à jour
      const setFields = fieldsToUpdate
        .map((field) => `${field} = ?`)
        .join(", ");

      const query = `UPDATE users SET ${setFields} WHERE id_user = ?`;

      // Ajouter l'ID de l'utilisateur à la liste des valeurs
      fieldValues.push(id);

      const result = await sql.query(query, fieldValues);
      sql.release();

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async remove(id) {
    try {
      const sql = await pool.getConnection();
      const query = "DELETE FROM users WHERE id_user = ?";
      const result = await sql.query(query, [id]);
      sql.release();

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
