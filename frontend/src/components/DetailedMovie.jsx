import React from 'react';

function DetailedMovie({ movie, onBack }) {
    return (
        <div className="container mx-auto p-5">
            <h2 className="text-2xl font-bold mb-5">{movie.title}</h2>
            <p><strong>Žanr:</strong> {movie.genre}</p>
            <p><strong>Vabu kohti:</strong> {movie.numSeats}</p>
            <p><strong>Vanusepiirang:</strong> {movie.ageRating}</p>
            <p><strong>Keel:</strong> {movie.language}</p>
            <p><strong>Kuupäev:</strong> {new Date(movie.screeningDate).toLocaleDateString()}</p>
            <p><strong>Kellaaeg:</strong> {movie.screeningTime}</p>
            <button onClick={onBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Tagasi kinokavasse</button>
        </div>
    );
}

export default DetailedMovie;
