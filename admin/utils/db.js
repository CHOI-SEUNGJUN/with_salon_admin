const db_conn = require('../config/connection')();
const config = require('../config/db');

const dbPool = db_conn.init_pool();

dbPool.on('connection', (connection) => {
  console.log('SET SESSION auto_increment_increment=1');
});
dbPool.on('enqueue', () => {
  console.log('Waiting for available connection slot');
});

const sqlQueryPromise = (sql) => { return new Promise((resolve, reject) => {
  dbPool.getConnection((err, connection) => {
    if (!err) {
      //connected
      //console.log('DB pool connection**********************');
      connection.query(sql, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    }
    connection.release();
    //console.log('************************DB pool release');
  });
});
}

module.exports = {
  sqlQueryPromise,
}