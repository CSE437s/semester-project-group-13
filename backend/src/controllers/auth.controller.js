const authService = require('../services/auth.service')

async function logout (req, res) {
  try {
    console.log('User logged out successfully')
    res.json({ message: 'Logout successful' })
  } catch (error) {
    console.error('Error while logging out', error)
    res.status(500).json({ error: 'Error logging out' })
  }
}

async function login (req, res) {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }

    const loginResult = await authService.login(username, password)

    if (loginResult.data.length > 0) {
      console.log('Login successful')
      res.status(200).json({ message: 'Login successful' })
    } else {
      console.log('Invalid credentials')
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    console.error('Error while logging in', error)
    res.status(500).json({ error: 'Error while logging in' })
  }
}

module.exports = {
  logout,
  login
}
