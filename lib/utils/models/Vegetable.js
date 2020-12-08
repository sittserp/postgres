const pool = require('../pool');

module.exports = class Vegetable {
    id;
    title;
    description;
    url;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.description = row.description;
      this.url = row.url;
    }

    // CRUD methods

    static async insert({ title, description, url }) {
      const { rows } = await pool.query(
        'INSERT INTO vegetables (title, description, url) VALUES ($1, $2, $3) RETURNING *',
        [title, description, url]
      );

      return new Vegetable(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM vegetables'
      );
      return rows.map(row => new Vegetable(row));
    }
  
    static async findById(id){
      const { rows } = await pool.query(
        'SELECT * FROM vegetables WHERE id=$1',
        [id]
      );
      if(!rows[0]) throw new Error(`No vegetable with id ${id}`);
      return new Vegetable(rows[0]);
    }
  
    static async update(id, { title, description, url }) {
      const { rows } = await pool.query(
        `UPDATE vegetables
              SET title=$1,
                  description=$2,
                  url=$3
              WHERE id=$4
              RETURNING *`,
        [title, description, url, id]
      );
  
      return new Vegetable(rows[0]);
    }
  
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM vegetables WHERE id=$1 RETURNING *',
        [id]
      );
      return new Vegetable(rows[0]);
    }
};
