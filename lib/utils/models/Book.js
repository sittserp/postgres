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
};