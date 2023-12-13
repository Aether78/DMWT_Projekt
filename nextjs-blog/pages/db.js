import { Pool } from 'pg';

const pool = new Pool({
    user: 'default',
    host: 'ep-late-cloud-51026261-pooler.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'WSuXD2gtOEP4',
    port: 5432, // Standard-PostgreSQL-Port
});

export default pool;
