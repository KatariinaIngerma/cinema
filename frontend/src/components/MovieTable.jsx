import React, { useState } from 'react';

// Button component
function TicketButton({ onClick }) {
    return (
        <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Osta pilet
        </button>
    );
}
// Filter component
function SelectFilter({ label, value, onChange, options }) {
    return (
        <div className="mr-4">
            <label htmlFor={label} className="p-2">{label}:</label>
            <select id={label} value={value} onChange={onChange} className="bg-gray-200 border border-gray-300 rounded-md px-4 py-2">
                <option value="">Kõik</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}
// Ajafilter component
function TimeFilter({ label, value, onChange }) {
    return (
        <div className="mr-4">
            <label htmlFor={label} className="p-2">{label}:</label>
            <input type="time" id={label} value={value} onChange={onChange} className="bg-gray-200 border border-gray-300 rounded-md px-4 py-2" />
        </div>
    );
}
// MovieTable component
function MovieTable({ movies, onBuyTicket, isLoggedIn, userHistory }) {
    const [genreFilter, setGenreFilter] = useState('');
    const [ageRatingFilter, setAgeRatingFilter] = useState('');
    const [langFilter, setLangFilter] = useState('');
    const [startingFromTimeFilter, setStartingFromTimeFilter] = useState('');
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
    const handleStartingFromTimeFilterChange = (event) => {
        setStartingFromTimeFilter(event.target.value);
    };

    // Žanrite sageduse arvutamine kasutaja vaatamiste ajaloos.
    const calculateGenreFrequency = () => {
        if (userHistory.length < 2) {
            window.alert("Ajaloos pole piisavalt filme või pole sisse logitud.");
            setShowScores(false);
            return {};
        }
        const genreFrequency = {};
        userHistory.forEach(movie => {
            if (genreFrequency[movie.genre]) {
                genreFrequency[movie.genre]++;
            } else {
                genreFrequency[movie.genre] = 1;
            }
        });
        return genreFrequency;
    };

    // Žanrite kaalude arvutamine
    const calculateGenreWeights = (genreFrequency) => {
        const totalMoviesInHistory = userHistory.length;
        const genreWeights = {};
        Object.keys(genreFrequency).forEach(genre => {
            genreWeights[genre] = genreFrequency[genre] / totalMoviesInHistory;
        });
        return genreWeights;
    };

    // Filmide skoorid kaalude põhjal
    const calculateMovieScores = (genreWeights) => {
        return movies.map(movie => {
            let score = 0;
            Object.keys(genreWeights).forEach(genre => {
                if (movie.genre === genre) {
                    score += genreWeights[genre];
                }
            });
            return { ...movie, score };
        });
    };

    // // Filtreerime soovitatud filmid, millel on positiivne skoor
    const filterRecommendedMovies = (moviesWithScores) => {
        return moviesWithScores.filter(movie => movie.score > 0.0);
    };

    // Sorteerime soovitatud filmid skoori järgi kahanevas järjekorras
    const sortMoviesByScore = (recommendedMovies) => {
        return recommendedMovies.sort((a, b) => b.score - a.score);
    };

    // Filmide soovitamine
    const handleRecommendMovies = () => {
        const genreFrequency = calculateGenreFrequency();
        if (Object.keys(genreFrequency).length === 0) {
            return;
        }
        const genreWeights = calculateGenreWeights(genreFrequency);
        const moviesWithScores = calculateMovieScores(genreWeights);
        const recommendedMovies = filterRecommendedMovies(moviesWithScores);
        const sortedRecommendedMovies = sortMoviesByScore(recommendedMovies);

        setShowScores(true);
        setRecommendedMovies(sortedRecommendedMovies);
    };

    // eemaldame kõik filtrid
    const handleResetRecommendedMovies = () => {
        setRecommendedMovies([]);
        setLangFilter('');
        setAgeRatingFilter('');
        setGenreFilter('');
        setStartingFromTimeFilter('');
        setShowScores(false);
    };

    return (
        <div className="overflow-x-auto rounded-md border-none m-5">
            <div className="mb-4 flex flex-col md:flex-row justify-between">
                <div className="flex flex-col md:flex-row mb-4 md:mb-0">
                    <SelectFilter label="Žanr" value={genreFilter} onChange={handleGenreFilterChange} options={[
                        { label: "Draama", value: "Drama" },
                        { label: "Action", value: "Action" },
                        { label: "Krimi", value: "Crime" },
                        { label: "Sci-Fi", value: "Sci-Fi" },
                        { label: "Thriller", value: "Thriller" },
                        { label: "Biograafia", value: "Biography" },
                    ]} />
                    <SelectFilter label="Vanusepiirang" value={ageRatingFilter} onChange={handleAgeRatingFilterChange} options={[
                        { label: "12+", value: "12" },
                        { label: "16+", value: "16" },
                        { label: "18+", value: "18" },
                    ]} />
                    <SelectFilter label="Keel" value={langFilter} onChange={handleLangFilterChange} options={[
                        { label: "Inglise", value: "Inglise" },
                        { label: "Eesti", value: "Eesti" },
                    ]} />
                    <TimeFilter label="Algus alates" value={startingFromTimeFilter} onChange={handleStartingFromTimeFilterChange} />
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
                    (langFilter === '' || movie.language === langFilter) &&
                    (startingFromTimeFilter === '' || movie.screeningTime >= startingFromTimeFilter)
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
