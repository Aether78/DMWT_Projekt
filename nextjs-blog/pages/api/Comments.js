import pool from '../../db';

export default async function handler(req, res) {
    try {
        const { method } = req;

        if (method === 'GET') {
            const { rows } = await pool.query('SELECT * FROM comments');
            res.status(200).json(rows);
        } else if (method === 'POST') {
            const { comment } = req.body;
            await pool.query('INSERT INTO comments (comment_text) VALUES ($1)', [comment]);
            res.status(201).json({ message: 'Comment added successfully' });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
