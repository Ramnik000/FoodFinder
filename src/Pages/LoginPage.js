import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });
            console.log(response.data); // Handle the response accordingly
            navigate('/foodapp');
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <div className="container">
            <h1 className="mb-4">Login Page</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <p className="text-center mt-3">Forget your password? <span className="forget-password-link" onClick={() => navigate('/forget-password')}>Reset here</span></p>
                <p className="text-center mt-3">Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Sign Up</span></p>
            </form>
        </div>
    );
}

export default LoginPage;