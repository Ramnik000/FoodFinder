import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup.js';

const Signup = () => {
    const { loading, error, registerUser } = useSignup();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignupClicked = async () => {
        // Prepare data to register user
        const userData = { name, email, password };
        await registerUser(userData);
    }

    return (
        <div className="container signup-container">
            <h1>Sign Up</h1>
            <form>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!email || !password || password !== confirmPassword} onClick={handleSignupClicked}>Sign up</button>
                <p className="text-center mt-3">Already have an account? <span className="login-link" onClick={() => navigate('/login')}>Login</span></p>
            </form>
        </div>
    );
}

export default Signup;
