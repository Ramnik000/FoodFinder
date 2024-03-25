import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
    return fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to log in');
        }
        return response.json();
    });
}

const LoginPage = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const onLoginClicked = async (e) => {
        e.preventDefault();
        try {
            const token = await loginUser({
                email,
                password
            });
            setToken(token);
            navigate('/foodapp');
        } catch (error) {
            console.error(error);
            setError('Invalid email or password');
        }
    }

    return (
        <div className="container login-container">
            <h1>Login Page</h1>
            <form onSubmit={onLoginClicked}>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary" disabled={!email || !password}>Log In</button>
                <p className="text-center mt-3">Forget your password? <span className="forget-password-link" onClick={() => navigate('/forget-password')}>Reset here</span></p>
                <p className="text-center mt-3">Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Sign Up</span></p>
            </form>
        </div>
    );
}

export default LoginPage;
