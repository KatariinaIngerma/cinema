import React, { useState } from 'react';

// Button component
function TicketButton({ onClick }) {
    return (
        <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Osta pilet
        </button>
    );
}

// MovieTable component
function MovieTable({ movies, onBuyTicket  }) {
    const [genreFilter, setGenreFilter] = useState('');
    const [ageRatingFilter, setAgeRatingFilter] = useState('');
    const [langFilter, setLangFilter] = useState('');

    const handleGenreFilterChange = (event) => {
        setGenreFilter(event.target.value);
    };

    const handleAgeRatingFilterChange = (event) => {
        setAgeRatingFilter(event.target.value);
    };

    const handleLangFilterChange = (event) => {
        setLangFilter(event.target.value);
    };
    const handleRecommendMovies = () => {
        // Logic for recommending movies based on user preferences
    };



    return (
        <div className="overflow-x-auto rounded-md border-none m-5">
            <div className="flex mb-4 justify-between">
                <div className="flex">
                <div>
                    <label htmlFor="genre" className="p-2">Žanr:</label>
                    <select id="genre" value={genreFilter} onChange={handleGenreFilterChange} className="bg-gray-200 border border-gray-300 rounded-md px-4 py-2">
                        <option value="">Kõik</option>
                        <option value="Draama">Draama</option>
                        <option value="Action">Action</option>
                        <option value="Komöödia">Komöödia</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="ageRating" className="p-2">Vanusepiirang:</label>
                    <select id="ageRating" value={ageRatingFilter} onChange={handleAgeRatingFilterChange} className="bg-gray-200 border border-gray-300 rounded-md px-4 py-2">
                        <option value="">Kõik</option>
                        <option value="12">12+</option>
                        <option value="16">16+</option>
                        <option value="18">18+</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="ageRating" className="p-2">Keel:</label>
                    <select id="ageRating" value={langFilter} onChange={handleLangFilterChange} className="bg-gray-200 border border-gray-300 rounded-md px-4 py-2">
                        <option value="">Kõik</option>
                        <option value="Inglise">Inglise</option>
                        <option value="Eesti">Eesti</option>
                    </select>
                </div>
            </div>
                <div>
                    <button onClick={handleRecommendMovies} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Soovita vaatamiste põhjal
                    </button>
                </div>
            </div>
            <table className="table-auto w-full text-gray-900 rounded-md ">
                <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-4 border-none">Nimi</th>
                    <th className="px-4 py-2 border-none">Žanr</th>
                    <th className="px-4 py-2 border-none">Vabu kohti</th>
                    <th className="px-4 py-2 border-none">Vanusepiirang</th>
                    <th className="px-4 py-2 border-none">Keel</th>
                    <th className="px-4 py-2 border-none">Kuupäev</th>
                    <th className="px-4 py-2 border-none">Kellaaeg</th>
                    <th className="px-4 py-2 border-none">Tegevused</th>
                </tr>
                </thead>
                <tbody className="">
                {movies
                    .filter(movie =>
                        (genreFilter === '' || movie.genre === genreFilter) &&
                        (ageRatingFilter === '' || movie.ageRating.toString() === ageRatingFilter) &&
                        (langFilter === '' || movie.language === langFilter)
                    )
                    .map((movie, index) => (
                        <tr key={movie.id} className="b-gray-200 border-none rounded-md">
                            <td className="px-4 py-8 border-none">{movie.title}</td>
                            <td className="px-4 py-2 border-none">{movie.genre}</td>
                            <td className="px-4 py-2 border-none">{movie.numSeats}</td>
                            <td className="px-4 py-2 border-none">{movie.ageRating}</td>
                            <td className="px-4 py-2 border-none">{movie.language}</td>
                            <td className="px-4 py-2 border-none">{new Date(movie.screeningDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border-none">{movie.screeningTime}</td>
                            <td className="px-4 py-2 border-none">
                                <TicketButton onClick={() => onBuyTicket(movie.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MovieTable;
