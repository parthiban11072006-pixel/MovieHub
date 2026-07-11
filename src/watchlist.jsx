import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        // LocalStorage-லிருந்து படங்களை எடுக்கும்
        const savedMovies = JSON.parse(localStorage.getItem("watchlist") || "[]");
        setWatchlist(savedMovies);
    }, []);

    // படம் நீக்கும் வசதி (Remove feature)
    const removeMovie = (id) => {
        let savedMovies = JSON.parse(localStorage.getItem("watchlist") || "[]");
        const updatedList = savedMovies.filter((movie) => movie.id !== id);
        localStorage.setItem("watchlist", JSON.stringify(updatedList));
        setWatchlist(updatedList);
    };

    return (
        <div style={{ backgroundColor: '#111', minHeight: '100vh', color: 'white', padding: '20px' }}>
            <h1>My Watchlist</h1>
            <Link to="/" style={{ color: 'lightblue', textDecoration: 'none' }}>← Back to Home</Link>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
                {watchlist.map((movie, index) => (
                    <div key={index} style={{ width: '150px' }}>
                        <img 
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''} 
                            alt={movie.title} 
                            style={{ width: '100%', borderRadius: '10px' }} 
                        />
                        <p style={{ fontSize: '14px', textAlign: 'center' }}>{movie.title}</p>
                        
                        {/* Remove பட்டன் */}
                        <button onClick={() => removeMovie(movie.id)} style={{ 
                            marginTop: '5px', 
                            backgroundColor: 'red', 
                            color: 'white', 
                            border: 'none', 
                            padding: '8px', 
                            borderRadius: '5px', 
                            cursor: 'pointer',
                            width: '100%'
                        }}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Watchlist;