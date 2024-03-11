import React, {useEffect, useState} from 'react';
import Seat from './Seat.jsx';

const SeatsPlan = ({ onSeatClick, onBack, numSelectedSeats, isLoggedIn, movie, userId }) => {
    const totalRows = 9;
    const totalCols = 10;
    const totalSeats = totalRows * totalCols;

    // genereerime juba broneeritud istekohad
    const generateRandomSeats = () => {
        const seatsMatrix = [];
        const bookedSeats = 35; // 20 kohta on juba broneeritud

        for (let i = 0; i < totalRows; i++) {
            const row = [];
            for (let j = 0; j < totalCols; j++) {
                row.push({ isBooked: false, isSelected: false });
            }
            seatsMatrix.push(row);
        }
        for (let i = 0; i < bookedSeats; i++) {
            const randomRow = Math.floor(Math.random() * totalRows);
            const randomCol = Math.floor(Math.random() * totalCols);
            seatsMatrix[randomRow][randomCol].isBooked = true;
        }
        return seatsMatrix;
    };
    /**
     * Funktsioon, mis leiab parimad n kohta, mis asuksid võimalikult keskel ja oleks järjest.
     * @returns bestSeats
     */
    const generateRecommendedSeats = () => {
        let bestRow = null;
        let minDistanceToMiddle = Infinity;
        let bestSeats = null;

        // Käime läbi kõik read
        for (let i = 0; i < totalRows; i++) {
            const row = seatsMatrix[i];
            const seats = findBestSeatsInRow(row, numSelectedSeats); // Leiame rea parimad kohad

            if (seats) {
                // Kauguses keskmisest
                const distanceToMiddle = Math.abs(i - Math.floor(totalRows / 2));

                // kui on aprem kui varasemini lisatud rida, siis uuendame andmeid
                if (distanceToMiddle < minDistanceToMiddle) {
                    bestRow = i;
                    minDistanceToMiddle = distanceToMiddle;
                    bestSeats = seats;
                }
            }
        }
        if (bestSeats) { // kui oleme leidnud parima dkohad siis teeme kollaseks
            const row = seatsMatrix[bestRow];
            bestSeats.forEach(col => {
                row[col].isSelected = true;
            });
            return bestSeats;
        } else {
            window.alert("Nii palju vabu kohti pole järjest.")
            return null;
        }
    };

    /**
     * Abifunktsioon, mis võtab ette ühe rea ja otsib sealt reast parimad järjestikused kohad ja tagastab need.
     * @param row reaindeks.
     * @param numSelectedSeats - mitu järjestikust kohta on vaja
     * @returns bestSeats - array parimatest kohtades selles reas.
     */
    const findBestSeatsInRow = (row, numSelectedSeats) => {
        const totalCols = 10;
        let bestSeats = null;
        let minDistanceToMiddle = Infinity;

        // Käime läbi kõik istekohad, kust saaks hakata otsia reast
        for (let startCol = 0; startCol <= totalCols - numSelectedSeats; startCol++) {
            let consecutiveSeats = [];
            let distanceToMiddle = Math.abs(startCol + Math.floor(numSelectedSeats / 2) - Math.floor(totalCols / 2));

            // Kui koht on pole bookitud juba, siis lisame array-sse, kui on bookitud siis teeme uue tühja ja otsime uuesti
            for (let col = startCol; col < startCol + numSelectedSeats; col++) {
                if (!row[col].isBooked) {
                    consecutiveSeats.push(col);
                } else {
                    consecutiveSeats = [];
                    break;
                }
            }
            // Kontroll, et vaadata kas uued kohad on lähemal keskele kui eelmine salvestatud
            if (consecutiveSeats.length === numSelectedSeats && distanceToMiddle < minDistanceToMiddle) {
                bestSeats = consecutiveSeats;
                minDistanceToMiddle = distanceToMiddle;
            }
        }
        return bestSeats;
    };

    const [seatsMatrix, setSeatsMatrix] = useState(generateRandomSeats());

    useEffect(() => {
        setSeatsMatrix(generateRandomSeats());
    }, []);

    generateRecommendedSeats();

    const handlePurchase = async () => {
        if (isLoggedIn) {
            try {
                const movieId = movie.id;
                const response = await fetch(`http://localhost:8080/auth/${userId}/addMovie/${movieId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (response.ok) {
                    console.log("Purchase confirmed.");
                    onBack(true);
                } else {
                    console.error("Failed to confirm purchase.");
                }
            } catch (error) {
                console.error("Error occurred while confirming purchase:", error);
            }
        } else {
            // kasutaja pole sisse logitud, ehk ei lisa talle ajalukku filmi ja lähme lihtsalt tagasi
            console.log("Purchase confirmed.");
            onBack(true);
        }
    };

        return (
        <div>
            <h1 className="text-3xl font-bold m-5 text-gray-700">3. Istekohad</h1>
            <p className="m-5 text-xl text-gray-700">Ekraan</p>
            <div className="grid grid-cols-10 gap-1">
                {seatsMatrix.map((row, rowIndex) => (
                    row.map((seat, colIndex) => (
                        <Seat
                            key={`${rowIndex}-${colIndex}`}
                            isBooked={seat.isBooked}
                            isSelected={seat.isSelected}
                        />
                    ))
                ))}
            </div>
            <button onClick={onBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">Tagasi kinokavasse</button>
            <button onClick={handlePurchase} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 ml-4">Kinnita ost</button>
        </div>
    );
};

export default SeatsPlan;
