import React, {useState} from 'react';

function DetailedMovie({ movie, onBack, onSelectSeat }) {
    const [numSeats, setNumSeats] = useState(0); // 2 istet valitud alguses

    const handleNumSeatsChange = (e) => {
        setNumSeats(parseInt(e.target.value));
        console.log(numSeats, "istekohta valitud")
    };
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
            <h1 className="text-3xl font-bold m-5">2. Istekohtade arv</h1>
            <div className="mt-5">
                <label htmlFor="numSeats" className="mr-2">Vali istekohtade arv:</label>
                <input type="number" id="numSeats" name="numSeats" min="2" max={numSeats} value={numSeats} onChange={handleNumSeatsChange} autoFocus />
            </div>
            <button onClick={onBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">Tagasi kinokavasse</button>
            {/*propina kaasa istmete arv*/}
            <button onClick={() => onSelectSeat(numSeats)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 mt-5">Istekohtasi valima</button>
        </div>
    );
}

export default DetailedMovie;
