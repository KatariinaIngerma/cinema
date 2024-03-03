import {useEffect, useState} from 'react';
import './App.css'
import './index.css'
import axios from "axios";
import MovieTable from "./components/MovieTable.jsx";
import DetailedMovie from "./components/DetailedMovie.jsx";
import Header from "./components/Header.jsx";
import SeatsPlan from "./components/SeatsPlan.jsx";

function App() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSeatPlan, setShowSeatPlan] = useState(false);
    const [numSelectedSeats, setNumSelectedSeats] = useState(0);

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
        setShowSeatPlan(false);
    };

    //
    const handleSelectSeats=(numSeats)=>{
        console.log("k", numSeats);
        setNumSelectedSeats(numSeats);
        setShowSeatPlan(true);
    }


    return (
        <>
            <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
            <div className="movie-list flex justify-center py-12">
                {selectedMovie ? (
                    <>
                        {showSeatPlan ? (
                            <SeatsPlan movie={selectedMovie} onBack={handleBackToMovies} numSelectedSeats={numSelectedSeats} />
                        ) : (
                            <DetailedMovie movie={selectedMovie} onBack={handleBackToMovies} onSelectSeat={handleSelectSeats} />
                        )}
                    </>
                ) : (
                    <MovieTable movies={movies} onBuyTicket={handleBuyTicket} />
                )}

            </div>
        </>
    );
}

export default App;
