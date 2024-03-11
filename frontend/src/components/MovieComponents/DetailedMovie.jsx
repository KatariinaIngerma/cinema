import React, {useEffect, useState} from 'react';
import axios from "axios";

function DetailedMovie({ movie, onBack, onSelectSeat }) {
    const [numSeats, setNumSeats] = useState(1);
    const [imdbRating, setImdbRating] = useState(null);
    const [imdbId, setImdbId] = useState(null);

    const handleNumSeatsChange = (e) => {
        const seats = parseInt(e.target.value);
        if (seats > 0) {
            setNumSeats(seats);
        }
    };
    const handleSeatSelection = () => {
        if (numSeats > 0) {
            onSelectSeat(numSeats);
        } else {
            window.alert("Valige vähemalt 1 istekoht.");
        }
    };

    // leiame pealkirja järgi imdb id ja id kaudu saab skoori.
    useEffect(() => {
        const fetchImdbId = async () => {
            try {
                const response = await axios.get('https://mdblist.p.rapidapi.com/', {
                    params: {
                        s: movie.title // otsime filmi pealkirja järgi
                    },
                    headers: {
                        'X-RapidAPI-Key': 'e3a858d7dbmsh201403a60787270p1a8c14jsn741b5c380ddc',
                        'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
                    }
                });
                if (response.data && response.data.search && response.data.search.length > 0) {
                    const imdbId = response.data.search[0].imdbid;
                    setImdbId(imdbId);
                }

            } catch (error) {
                console.error('Error fetching IMDb ID:', error);
            }
        };
        if (movie.title) {
            fetchImdbId();
        }
    }, [movie.title]);

    useEffect(() => {
        const fetchImdbScore = async () => {
            if (!imdbId) return;

            try {
                const response = await axios.get('https://mdblist.p.rapidapi.com/', {
                    params: {
                        i: imdbId
                    },
                    headers: {
                        'X-RapidAPI-Key': 'e3a858d7dbmsh201403a60787270p1a8c14jsn741b5c380ddc',
                        'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
                    }
                });

                const imdb = response.data.ratings.find(rating => rating.source === 'imdb');

                if (imdb) {
                    setImdbRating(imdb.value);
                }
               console.log(imdb)

            } catch (error) {
                console.error('Error fetching IMDb score:', error);
            }
        };
        fetchImdbScore();

    }, [imdbId]);

    return (
        <div className="container mx-auto p-5 text-gray-700">
            <h1 className="text-3xl font-bold m-5">1. Film</h1>
            <h2 className="text-2xl font-bold mb-5">{movie.title}</h2>
            <p><strong>Žanr:</strong> {movie.genre}</p>
            <p><strong>Vabu kohti:</strong> {movie.numSeats}</p>
            <p><strong>Vanusepiirang:</strong> {movie.ageRating}</p>
            <p><strong>Keel:</strong> {movie.language}</p>
            <p><strong>Kuupäev:</strong> {new Date(movie.screeningDate).toLocaleDateString()}</p>
            <p><strong>Kellaaeg:</strong> {movie.screeningTime}</p>
            <p><strong>IMDB:</strong> {imdbRating}</p>
            <h1 className="text-3xl font-bold m-5">2. Istekohtade arv</h1>
            <div className="mt-5">
                <label htmlFor="numSeats" className="mr-2">Vali istekohtade arv:</label>
                <input type="number" id="numSeats" name="numSeats" min="2" value={numSeats} onChange={handleNumSeatsChange} autoFocus />
            </div>
            <button onClick={onBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Tagasi kinokavasse</button>
            <button onClick={handleSeatSelection} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 mt-5">Istekohtasi valima</button>
        </div>
    );
}

export default DetailedMovie;
