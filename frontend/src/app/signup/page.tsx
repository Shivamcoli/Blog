'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/signup.css';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Signup successful! Redirecting...');
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } else {
      setMessage(data.message || 'Signup failed.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
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
          <button type="submit">Sign Up</button>
        </form>
        {message && <p className="signup-message">{message}</p>}

        {/* ✅ Redirect to login button */}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>Already have an account?</p>
          <button
            onClick={() => router.push('/login')}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
