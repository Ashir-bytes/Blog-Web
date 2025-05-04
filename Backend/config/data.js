// backend/db.js
// const mysql = require('mysql2/promise');    // ← use the promise wrapper
const mysql = require('mysql2/promise');
// Create a promise‐based pool (better for production than single connections)
const pool = mysql.createPool({
  host:     'localhost',
  user:     'root',
  password: '1234',
  database: 'blogdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(conn => {
    console.log('✅ Connected to MySQL (promise pool)');
    conn.release();      // return the connection to the pool
  })
  .catch(err => {
    console.error('❌ MySQL connection error:', err);
    process.exit(1);
  });

module.exports = pool;   // pool.query() / pool.execute() now return Promises
