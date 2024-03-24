import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const onSignupClicked = async () => {
        alert("Signup not implemented yet");
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const changeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    return (
        <div className="container signup-container">
            <h1>Sign Up</h1>
            <form>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={changeEmail} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={changePassword} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={changeConfirmPassword} />
                </div>
                <button type="button" className="btn btn-primary" disabled={!email || !password || password !== confirmPassword} onClick={onSignupClicked}>Sign up</button>
                <p className="text-center mt-3">Already have an account? <span className="login-link" onClick={() => navigate('/login')}>Login</span></p>
            </form>
        </div>
    );
}

export default Signup;
