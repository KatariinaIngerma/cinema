import React from 'react';

function MovieTable({ movies }) {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Nimi</th>
                    <th>Žanr</th>
                    <th>Vabu kohti</th>
                    <th>Vanusepiirang</th>
                    <th>Kuupäev</th>
                    <th>Kellaaeg</th>
                </tr>
                </thead>
                <tbody>
                {movies.map(movie => (
                    <tr key={movie.id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre}</td>
                        <td>{movie.numSeats}</td>
                        <td>{movie.ageRating}</td>
                        <td>{new Date(movie.screeningDate).toLocaleDateString()}</td>
                        <td>{movie.screeningTime}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default MovieTable;
