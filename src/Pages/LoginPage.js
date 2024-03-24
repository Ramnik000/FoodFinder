import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onLoginClicked = async () => {
        alert("Login not implemented yet");
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="container login-container">
            <h1>Login Page</h1>
            <form>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={changeEmail} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={changePassword} />
                </div>
                <button type="button" className="btn btn-primary" disabled={!email || !password} onClick={onLoginClicked}>Log In</button>
                <p className="text-center mt-3">Forget your password? <span className="forget-password-link" onClick={() => navigate('/forget-password')}>Reset here</span></p>
                <p className="text-center mt-3">Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Sign Up</span></p>
            </form>
        </div>
    );
}

export default LoginPage;
