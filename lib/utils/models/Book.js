const pool = require('../pool');

module.exports = class Book {
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
        'INSERT INTO books (title, description, url) VALUES ($1, $2, $3) RETURNING *',
        [title, description, url]
      );

      return new Book(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM books'
      );
      return rows.map(row => new Book(row));
    }
  
    static async findById(id){
      const { rows } = await pool.query(
        'SELECT * FROM books WHERE id=$1',
        [id]
      );
      if(!rows[0]) throw new Error(`No book with id ${id}`);
      return new Book(rows[0]);
    }
  
    static async update(id, { title, description, url }) {
      const { rows } = await pool.query(
        `UPDATE books
              SET title=$1,
                  description=$2,
                  url=$3
              WHERE id=$4
              RETURNING *`,
        [title, description, url, id]
      );
  
      return new Book(rows[0]);
    }
  
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM books WHERE id=$1 RETURNING *',
        [id]
      );
      return new Book(rows[0]);
    }
};
