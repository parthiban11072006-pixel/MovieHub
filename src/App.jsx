import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetail from './MovieDetails'; // நீங்கள் உருவாக்கிய கோப்பு
import Home from './Home';
import Watchlist from './Watchlist';
import { auth, googleProvider } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
    } catch (error) { alert(error.message); }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account Created! You can now Login.");
    } catch (error) { alert(error.message); }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) { alert(error.message); }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
  };

  // 'Enter' பட்டனை அழுத்தினால் லாகின் ஆகும் பங்க்ஷன்
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home onLogout={() => auth.signOut()} /> : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#111', color: 'white' }}>
            <h1>MovieApp</h1>
           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', margin: '5px', width: '250px', backgroundColor: 'white', color: 'black' }} />
           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', margin: '5px', width: '250px', backgroundColor: 'white', color: 'black' }} />
            
            {/* லாகின் பட்டன்கள் இங்கே உள்ளன */}
            <button onClick={handleLogin} style={{ padding: '10px', margin: '5px', width: '250px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>Login</button>
            <button onClick={handleSignUp} style={{ padding: '10px', margin: '5px', width: '250px', backgroundColor: 'grey', color: 'white', border: 'none', cursor: 'pointer' }}>Sign Up</button>
            <button onClick={handleGoogleLogin} style={{ padding: '10px', margin: '5px', width: '250px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>Sign in with Google</button>
          </div>
        )} />
        
        {/* டிரெய்லர் விவரங்கள் பக்கம் */}
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
