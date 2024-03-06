const db = require('./db.service');

async function logout() {
    try {
      console.log('User logged out successfully');
      return { message: 'Logout successful' };
    } catch (error) {
      console.error('Error while logging out', error);
      throw error;
    }
  }

async function login(username, password) {
  try {
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    const rows = await db.query(sql, [username, password]);
    return { data: rows };
  } catch (error) {
    console.error('Error while logging in', error);
    throw error;
  }
}

module.exports = {
  login,
  logout,
};

  
