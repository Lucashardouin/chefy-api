const mariadb = require('mariadb');
const pool = require('../config/db');

class Category{

    static async create(newCategory){
        try{
            const fields = Object.getOwnPropertyNames(newCategory);
            const placeholders = Array(fields.length).fill('?').join(', ');
            const values = Object.values(newCategory);
            const sql = await pool.getConnection();
            const result = await sql.query(`INSERT INTO category (${fields}) VALUES (${placeholders})`, values);
            sql.release();
            return result;
        }catch(error){
            throw error;
        }
    };
}

module.exports = Category;