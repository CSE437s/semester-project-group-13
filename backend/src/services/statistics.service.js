const db = require('./db.service');

async function getAll(table, column, value) {
    try {
        const tableExists = await checkTableExists(table);
        if (!tableExists) {
            throw new Error(`Table '${table}' does not exist`);
        }

        const columnIsDate = await checkColumnIsDate(table, column);
        if (column && !columnIsDate) {
            throw new Error(`Column '${column}' in table '${table}' is not a date column`);
        }

        let sql = `SELECT * FROM ${table} WHERE ${column} = ?`;
        const params = [value];

        const rows = await db.query(sql, params);
        return {
            data: rows,
            metadata: {
                rowCount: rows.length 
            }
        };
    } catch (error) {
        console.error('Error while getting requests', error);
        throw error;
    }
}


async function getSomeCategory(table, column, value, startIndex, limit) {
    try {
      const tableExists = await checkTableExists(table);
      if (!tableExists) {
        throw new Error(`Table '${table}' does not exist`);
      }
  
  
      let sql = `SELECT * FROM ${table}`;
      const params = [];
  
      if (column && value) {
        sql += ` WHERE ${column} = ?`;
        params.push(value);
      }
  
      if (startIndex !== undefined && limit !== undefined) {
        sql += ` LIMIT ?, ?`;
        params.push(startIndex, limit);
      }
  
      const rows = await db.query(sql, params);
      return {
        data: rows,
        metadata: {
          rowCount: rows.length,
        },
      };
    } catch (error) {
      console.error('Error while getting requests', error);
      throw error;
    }
  }

async function getAllFromDate(table, column, value, startDate, endDate, dateColumn) {
    try {
        const tableExists = await checkTableExists(table);
        if (!tableExists) {
            throw new Error(`Table '${table}' does not exist`);
        }

        const dateColumnIsDate = await checkColumnIsDate(table, dateColumn);
        if (dateColumn && !dateColumnIsDate) {
            throw new Error(`Column '${dateColumn}' in table '${table}' is not a date column`);
        }

        let sql = `SELECT * FROM ${table}`;
        const params = [];

        if (column && value) {
            sql += ` WHERE ${column} = ?`;
            params.push(value); // Assuming value is a string
        }

        if (startDate && endDate) {
            if (params.length > 0) {
                sql += ' AND';
            } else {
                sql += ' WHERE';
            }
            sql += ` ${dateColumn} BETWEEN ? AND ?`;
            params.push(startDate, endDate);
        }

        const rows = await db.query(sql, params);
        return {
            data: rows,
            metadata: {
                rowCount: rows.length // Get the number of rows returned
            }
        };
    } catch (error) {
        console.error('Error while getting requests', error);
        throw error;
    }
}


async function getSomeFromDate(table, column, value, startDate, endDate, dateColumn, startIndex, limit) {
    try {
      const tableExists = await checkTableExists(table);
      if (!tableExists) {
        throw new Error(`Table '${table}' does not exist`);
      }
  
      const dateColumnIsDate = await checkColumnIsDate(table, dateColumn);
      if (dateColumn && !dateColumnIsDate) {
        throw new Error(`Column '${dateColumn}' in table '${table}' is not a date column`);
      }
  
      let sql = `SELECT * FROM ${table}`;
      const params = [];
  
      if (column && value) {
        sql += ` WHERE ${column} = ?`;
        params.push(value);
      }
  
      if (startDate && endDate) {
        if (params.length > 0) {
          sql += ' AND';
        } else {
          sql += ' WHERE';
        }
        sql += ` ${dateColumn} BETWEEN ? AND ?`;
        params.push(startDate, endDate);
      }
  
      if (startIndex !== undefined && limit !== undefined) {
        sql += ` LIMIT ?, ?`;
        params.push(startIndex, limit); 
      }
  
      const rows = await db.query(sql, params);
      return {
        data: rows,
        metadata: {
          rowCount: rows.length 
        }
      };
    } catch (error) {
      console.error('Error while getting requests', error);
      throw error;
    }
}

async function checkTableExists(table) {
    try {
        // Query to check if the table exists in the database schema
        const query = `SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?`;
        const result = await db.query(query, [table]);
        return result[0].count > 0;
    } catch (error) {
        console.error('Error while checking if table exists', error);
        throw error;
    }
}

async function checkColumnIsDate(table, column) {
    try {
        // Query to check if the specified column exists and holds date values
        const query = `SELECT COUNT(*) AS count FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ? AND data_type LIKE '%date%'`;
        const result = await db.query(query, [table, column]);
        return result[0].count > 0;
    } catch (error) {
        console.error('Error while checking if column is date', error);
        throw error;
    }
}

module.exports = {
    getAll,
    getAllFromDate,
    getSomeCategory,
    getSomeFromDate,
};
