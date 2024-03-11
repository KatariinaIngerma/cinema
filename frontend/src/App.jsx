import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './App.css'
import './index.css'
import axios from "axios";
import MovieTable from "./components/MovieTable.jsx";
import DetailedMovie from "./components/MovieComponents/DetailedMovie.jsx";
import Header from "./components/Header.jsx";
import SeatsPlan from "./components/MovieComponents/SeatsPlan.jsx";
import LoginForm from "./components/LoginComponents/Login.jsx";
import Profile from "./components/ProfileComponents/Profile.jsx";

    export async function getCurrentUser() {
    try {
        const jwtToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt='));
        if (!jwtToken) {
            throw new Error('JWT token not found');
        }

        const response = await fetch('http://localhost:8080/auth/me', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        return userData; // Return user data including email and ID
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}
    export const handleLogout = () => {
        axios.delete('http://localhost:8080/auth/logout')
            .then(response => {
                console.log(response.data);
                document.cookie = `jwt=${response.data.jwt}; Secure; SameSite=Strict`;
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
        };

    // Main
function App() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSeatPlan, setShowSeatPlan] = useState(false);
    const [numSelectedSeats, setNumSelectedSeats] = useState(0);
    const [userHistory, setUserHistory] = useState([]);
    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState("");


    useEffect(() => {
        const jwtToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt='));
        if (jwtToken) {
            setIsLoggedIn(true);
        }
        // Backendist get requestiga filmid
        axios.get('http://localhost:8080/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    useEffect(() => {
        getCurrentUser()
            .then(userData => {
                setEmail(userData.email);
                setUserId(userData.id);
                setIsLoggedIn(true);
                setUserHistory(userData.history);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
            });
    }, [userHistory]);


    const handleBuyTicket = (movieId) => {
        const movie = movies.find(movie => movie.id === movieId);
        setSelectedMovie(movie);
    };

    const handleBackToMovies = () => {
        setSelectedMovie(null);
        setShowSeatPlan(false);
    };

    const handleSelectSeats = (numSeats) => {
        console.log("k", numSeats);
        setNumSelectedSeats(numSeats);
        setShowSeatPlan(true);
    }

    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <>
                        <LoginForm  />
                    </>
                }
            />
            <Route path="/profile"
                   element=
                       {<Profile
                           isLoggedIn={isLoggedIn}
                           onBack={handleBackToMovies}
                           onLogout={handleLogout}
                            />} />
            <Route
                path="*"
                element={
                    <>
                        <Header
                            isLoggedIn={isLoggedIn}
                            onLogout={handleLogout}
                        />

                        <div className="movie-list flex justify-center py-12">
                            {selectedMovie ? (
                                <>
                                    {showSeatPlan ? (
                                        <SeatsPlan
                                            userId={userId}
                                            movie={selectedMovie}
                                            onBack={handleBackToMovies}
                                            numSelectedSeats={numSelectedSeats}
                                            isLoggedIn={isLoggedIn}
                                        />
                                    ) : (
                                        <DetailedMovie
                                            movie={selectedMovie}
                                            onBack={handleBackToMovies}
                                            onSelectSeat={handleSelectSeats}
                                        />
                                    )}
                                </>
                            ) : (
                                <MovieTable
                                    isLoggedIn={isLoggedIn}
                                    movies={movies}
                                    onBuyTicket={handleBuyTicket}
                                    userHistory={userHistory}
                                />
                            )}
                        </div>
                    </>
                }
            />
        </Routes>
    );

}
export default App;
