// server.js

// Erforderliche Module importieren
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Umgebungsvariablen aus der .env-Datei laden
require('dotenv').config();

// Express-App erstellen
const app = express();

// PostgreSQL-Datenbankverbindung herstellen
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // Standard-Postgres-Port
});

// Middleware für die Verarbeitung von JSON-Anfragen verwenden
app.use(bodyParser.json());

// Endpoint zum Speichern eines neuen Kommentars
app.post('/api/comments', async (req, res) => {
    const { username, comment } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO comments (username, comment) VALUES ($1, $2) RETURNING *',
            [username, comment]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// Port festlegen und Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
