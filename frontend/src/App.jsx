import {useEffect, useState} from 'react';
import './App.css'
import axios from "axios";

function App() {
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        // Fetch movie data from backend API
        axios.get('http://localhost:8080/movies')
            .then(response => {
                setMovies(response.data);
                console.log(movies);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);


    return (
        <>
            <h1>Kinokava</h1>
            <div className="movie-list">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <h2>{movie.title}</h2>
                        <p>Genre: {movie.genre}</p>
                        <p>Number of Seats: {movie.numSeats}</p>
                        <p>Age Rating: {movie.ageRating}</p>
                        <p>Screening Date: {new Date(movie.screeningDate).toLocaleDateString()}</p>
                        <p>Screening Time: {movie.screeningTime}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default App;
