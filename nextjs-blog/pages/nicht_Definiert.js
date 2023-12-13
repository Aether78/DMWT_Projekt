//pages/api/comments.js
import pool from './db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const result = await pool.query('SELECT * FROM comments');
        res.status(200).json(result.rows);
    } else if (req.method === 'POST') {
        const { username, comment } = req.body;
        const result = await pool.query('INSERT INTO comments (username, comment) VALUES ($1, $2) RETURNING *', [username, comment]);
        res.status(201).json(result.rows[0]);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
