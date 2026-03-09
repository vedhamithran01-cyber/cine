import React, { useState } from 'react';

const LoginPage = () => {
  // 1. Setup 'State' to hold the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Function to handle the form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevents the page from reloading
    
    // For now, we just log the data to the console
    console.log("Logging in with:", { email, password });
    alert(`Welcome, ${email}!`);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2>Login</h2>
        
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email"
            required 
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter password"
            required 
          />
        </div>

        <button type="submit" style={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

// Simple inline styles to make it look decent
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial' },
  form: { border: '1px solid #ccc', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  inputGroup: { marginBottom: '1rem', display: 'flex', flexDirection: 'column' },
  button: { padding: '0.7rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default LoginPage;