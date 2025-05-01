const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'blogdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = db;
