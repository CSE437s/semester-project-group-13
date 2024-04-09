const mysql = require('mysql2/promise')
const dbConfig = require('../configs/db.config')

async function query (sql, params) {
  const connection = await mysql.createConnection(dbConfig)

  try {
    const [results] = await connection.execute(sql, params)
    console.log('Database query successful:', { sql, params, results })
    return results
  } catch (error) {
    console.error('Database query failed:', { sql, params, error })
    throw error
  } finally {
    await connection.end()
  }
}

module.exports = {
  query
}
