'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/login.css'; // ✅ Adjust path if needed

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard'); // ✅ Redirect to dashboard
      }, 1000);
    } else {
      setMessage(data.message || 'Login failed.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
          <div className="login-redirect">
                <p>Dont have an account?</p>
                <button onClick={() => router.push('/signup')}>
                    Sign Up
                </button>
            </div>

        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}
