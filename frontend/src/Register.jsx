import React, { useState } from 'react';

const Register = () => {
    // State variables for handling username and password inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const handleRegistration = (e) => {
        e.preventDefault();
        
        // Perform authentication logic here, e.g., send credentials to a server
        console.log('Login clicked');
        console.log('Username:', username);
        console.log('Password:', password);

        // You can perform further actions, such as redirecting the user upon successful login
    };

    return (
        <div>
            <h2>Registration</h2>
            <form onSubmit={handleRegistration}>
                <label>
                    Username:
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Email:
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
