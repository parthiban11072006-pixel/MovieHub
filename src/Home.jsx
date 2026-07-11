import React, { useEffect, useState } from 'react';
import axios from './axios';
import { API_KEY } from './constants';
import { Link } from 'react-router-dom';

function Home({ onLogout }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);

    // Trending movies fetch
    useEffect(() => {
        axios.get(`/trending/all/week?api_key=${API_KEY}`)
            .then((response) => setMovies(response.data.results))
            .catch((error) => console.log(error));
    }, []);

    // Search functionality
    useEffect(() => {
        if (searchQuery.length > 2) {
            axios.get(`/search/movie?api_key=${API_KEY}&query=${searchQuery}`)
                .then((response) => setMovies(response.data.results))
                .catch((err) => console.log(err));
        } else {
            axios.get(`/trending/all/week?api_key=${API_KEY}`)
                .then((response) => setMovies(response.data.results))
                .catch((err) => console.log(err));
        }
    }, [searchQuery]);

    const addToWatchlist = (movie) => {
        let list = JSON.parse(localStorage.getItem("watchlist") || "[]");
        list.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(list));
        alert("Movie added to watchlist!");
    };

    return (
        <div style={{ backgroundColor: '#111', minHeight: '100vh', color: 'white' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#000' }}>
                <h1 style={{ color: 'red', margin: 0 }}>MovieApp</h1>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to="/watchlist">
                        <button style={{ padding: '10px 20px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            Watchlist
                        </button>
                    </Link>
                    <button onClick={onLogout} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>

                <input 
                    type="text" 
                    placeholder="Search movies..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '10px', width: '300px', borderRadius: '5px', border: 'none' }}
                />
            </div>

            {/* Movies List */}
            <div style={{ padding: '20px' }}>
                <h2>Trending Movies</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {movies.map((movie) => (
                        <div key={movie.id} style={{ width: '180px' }}>
                            <Link to={`/movie/${movie.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{ width: '100%', borderRadius: '10px' }} />
                            </Link>
                            <button onClick={() => addToWatchlist(movie)} style={{ marginTop: '10px', width: '100%', padding: '5px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                ❤️ Add to Watchlist
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;