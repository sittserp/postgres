const pool = require('../pool');

module.exports = class Beverage {
    id;
    title;
    description;
    cold;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.description = row.description;
      this.cold = row.cold;
    }

    // CRUD methods

    static async insert({ title, description, cold }) {
      const { rows } = await pool.query(
        'INSERT INTO beverages (title, description, cold) VALUES ($1, $2, $3) RETURNING *',
        [title, description, cold]
      );

      return new Beverage(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM beverages'
      );
      return rows.map(row => new Beverage(row));
    }

    static async findById(id){
      const { rows } = await pool.query(
        'SELECT * FROM beverages WHERE id=$1',
        [id]
      );
      if(!rows[0]) throw new Error(`No beverage with id ${id}`);
      return new Beverage(rows[0]);
    }

    static async update(id, { title, description, cold }) {
      const { rows } = await pool.query(
        `UPDATE beverages
            SET title=$1,
                description=$2,
                cold=$3
            WHERE id=$4
            RETURNING *`,
        [title, description, cold, id]
      );

      return new Beverage(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM beverages WHERE id=$1 RETURNING *',
        [id]
      );
      return new Beverage(rows[0]);
    }
};


