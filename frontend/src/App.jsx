import {useEffect, useState} from 'react';
import './App.css'
import './index.css'
import axios from "axios";
import MovieTable from "./components/MovieTable.jsx";
import DetailedMovie from "./components/DetailedMovie.jsx";
import Header from "./components/Header.jsx";

function App() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        console.log("logimine õnnestus")
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        console.log("välja logitud")
        setIsLoggedIn(false);
    };
    useEffect(() => {
        // Backendist get requestiga filmid
        axios.get('http://localhost:8080/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    const handleBuyTicket = (movieId) => {
        const movie = movies.find(movie => movie.id === movieId);
        setSelectedMovie(movie);
    };

    const handleBackToMovies = () => {
        setSelectedMovie(null);
    };


    return (
        <>
            <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
            <div className="movie-list flex justify-center py-12">
                {selectedMovie ? (
                    <DetailedMovie movie={selectedMovie} onBack={handleBackToMovies} />
                ) : (
                    <MovieTable movies={movies} onBuyTicket={handleBuyTicket} />
                )}
            </div>
        </>
    );
}

export default App;
