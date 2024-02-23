import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        console.log('Login clicked');
        console.log('Username:', username);
        console.log('Password:', password);


        const credentials = { username: username, password: password };
        axios.post('http://localhost:8080/getUser', credentials)
            .then((response) => {
                const data = response.data;
                console.log(data);
                setUsername(data.username);
                setPassword(data.password);
                props.onLogin();
            }).catch((error) => {
                if(error.s)
                console.error('Error making API call:', error);
            });


    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <br />
                <button type="submit">Login</button>
            </form>
            <button type="button">TestApi</button>
        </div>
    );
};

export default Login;
