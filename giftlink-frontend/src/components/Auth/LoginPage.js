import React, { useState } from 'react';
import API_BASE_URL from '../../config';

function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.token) {
                sessionStorage.setItem('auth-token', data.token);
            }

            console.log('Login response:', data);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;