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
function MovieTable({ movies, onBuyTicket, isLoggedIn, userHistory }) {
    const [genreFilter, setGenreFilter] = useState('');
    const [ageRatingFilter, setAgeRatingFilter] = useState('');
    const [langFilter, setLangFilter] = useState('');
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [showScores, setShowScores] = useState(false);

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
        // Arvutame iga žanri sageduse kasutaja vaadatud filmides
        if (userHistory.length < 2) {
            window.alert("Ajaloos pole piisavalt filme või pole sisse logitud.");
            setShowScores(false);
            return;
        }
        const genreFrequency = {};
        userHistory.forEach(movie => {
            if (genreFrequency[movie.genre]) {
                genreFrequency[movie.genre]++;
            } else {
                genreFrequency[movie.genre] = 1;
            }
        });

        const totalMoviesInHistory = userHistory.length;

        // Kasutaja ajaloo põhjal paneme igale žanrile kaalu
        const genreWeights = {};
        Object.keys(genreFrequency).forEach(genre => {
            genreWeights[genre] = genreFrequency[genre] / totalMoviesInHistory;
        });

        console.log(genreWeights)

        // Lisame tabelisse igale filmile kaalu
        const moviesWithScores = movies.map(movie => {
            let score = 0;
            Object.keys(genreWeights).forEach(genre => {
                if (movie.genre === genre) {
                    score += genreWeights[genre];
                }
            });
            return { ...movie, score };
        });

        // Sorteerime ja näitame filme soovitustes siis kui skoor on üle 0.
        const recommendedMovies = moviesWithScores.filter(movie => movie.score > 0.0);
        recommendedMovies.sort((a, b) => b.score - a.score);

        setShowScores(true);
        setRecommendedMovies(recommendedMovies);
    };

    // eemaldame kõik filtrid
    const handleResetRecommendedMovies = () => {
        setRecommendedMovies([]);
        setLangFilter('');
        setAgeRatingFilter('');
        setGenreFilter('');
        setShowScores(false);
    };

    return (
        <div className="overflow-x-auto rounded-md border-none m-5">
            <div className="mb-4 flex flex-col md:flex-row justify-between">
                <div className="flex flex-col md:flex-row mb-4 md:mb-0">
                    <div className="mr-4">
                        <label htmlFor="genre" className="p-2">Žanr:</label>
                        <select id="genre" value={genreFilter} onChange={handleGenreFilterChange} className="bg-gray-200 border border-gray-300 rounded-md px-4 py-2">
                            <option value="">Kõik</option>
                            <option value="Drama">Draama</option>
                            <option value="Action">Action</option>
                            <option value="Crime">Krimi</option>
                        </select>
                    </div>
                    <div className="mr-4">
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
                    <button onClick={handleRecommendMovies} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 md:mb-0 md:ml-4">
                        Soovita vaatamiste põhjal
                    </button>
                    <button onClick={handleResetRecommendedMovies} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">
                        Lähtesta filtrid
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
                    {showScores && <th className="px-4 py-2 border-none">Sobivus</th>}
                    <th className="px-4 py-2 border-none">Tegevused</th>
                </tr>
                </thead>
                <tbody className="">
                {(recommendedMovies.length > 0 && showScores ? recommendedMovies : movies)
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
                            {showScores && <td className="px-4 py-2 border-none">{movie.score.toFixed(2)}</td>}
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
