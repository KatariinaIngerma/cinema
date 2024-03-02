import {useEffect, useState} from 'react';
import './App.css'
import './index.css'
import axios from "axios";
import MovieTable from "./components/MovieTable.jsx";

function App() {
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        // Fetch movie data from backend API
        axios.get('http://localhost:8080/movies')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);


    return (
        <>
            <h1 className="text-3xl font-bold underline">Kinokava</h1>
            <div className="movie-list">
                <MovieTable movies={movies} />
            </div>
        </>
    );
}

export default App;
