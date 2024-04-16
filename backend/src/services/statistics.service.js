const db = require('./db.service');

async function getAll(table, column, value) {
    try {
        let sql = `SELECT * FROM ${table} WHERE ${column} = ?`;
        const params = [value]; // Assuming value is a string

        const rows = await db.query(sql, params);
        return {
            data: rows,
        };
    } catch (error) {
        console.error('Error while getting requests', error);
        throw error;
    }
}

async function getAllFromDate(table, column, value, startDate, endDate, dateColumn) {
    try {
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
        };
    } catch (error) {
        console.error('Error while getting requests', error);
        throw error;
    }
}


module.exports = {
    getAll,
    getAllFromDate,
};
