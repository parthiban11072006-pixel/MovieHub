import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from './axios';
import { API_KEY } from './constants';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Backdrop pathum serthu edukka append_to_response use pannalam
    axios.get(`/movie/${id}?api_key=${API_KEY}&append_to_response=videos`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) return <div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Loading Movie Details...</div>;

  return (
    <div style={{ 
      color: 'white', 
      padding: '0', 
      backgroundColor: '#111', 
      minHeight: '100vh',
      // Full page background with gradient overlay
      backgroundImage: movie.backdrop_path ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div style={{ padding: '50px' }}>
        <h1 style={{ fontSize: '3rem', margin: '0' }}>{movie.title || movie.name}</h1>
        
        <div style={{ fontSize: '1.2rem', marginTop: '10px' }}>
          <strong>Release Date:</strong> {movie.release_date || 'N/A'} | 
          <strong> Rating:</strong> {movie.vote_average ? `${movie.vote_average}/10` : 'N/A'}
        </div>

        <p style={{ maxWidth: '700px', fontSize: '1.2rem', marginTop: '20px', lineHeight: '1.6' }}>
          {movie.overview}
        </p>

        {/* Trailer Video Section */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ marginBottom: '20px' }}>Watch Trailer</h2>
          {movie.videos && movie.videos.results.length > 0 ? (
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: '15px', border: '3px solid #333' }}
            />
          ) : (
            <p>Trailer not available for this movie.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;