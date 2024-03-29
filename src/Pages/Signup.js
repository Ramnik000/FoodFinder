import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                console.error('Passwords do not match');
                return;
            }

            const response = await axios.post('http://localhost:3000/signup', {
                name,
                email,
                password
            });

            console.log(response.data); 
            navigate('/login');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    }

    return (
        <div className="container-page">
            <h1 className="mb-4">Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
                <p className="text-center mt-3">Already have an account? <span className="login-link" onClick={() => navigate('/login')}>Login</span></p>
            </form>
        </div>
    );
}

export default Signup;