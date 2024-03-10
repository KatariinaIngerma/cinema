import React, { useState } from 'react';
import Seat from './Seat.jsx';

const SeatsPlan = ({ onSeatClick, onBack, numSelectedSeats, isLoggedIn, movie, userId }) => {
    const totalRows = 8;
    const totalCols = 10;
    const totalSeats = totalRows * totalCols;

    // genereerime istekohad
    const generateRandomSeats = () => {
        const seats = [];

        const bookedSeats = 20; // 25 kohta on juba brneeritud
        for (let i = 0; i < totalSeats; i++) {
            seats.push({ isBooked: false, isSelected: false });
        }
        for (let i = 0; i < bookedSeats; i++) {
            const randomIndex = Math.floor(Math.random() * totalSeats);
            seats[randomIndex].isBooked = true;
        }

        // Kollased kohad kasutajale
        const recommendedSeats = [];
        const middleRow = Math.floor(totalRows / 2);
        const middleCol = Math.floor(totalCols / 2);
        const halfNumSelectedSeats = Math.ceil(numSelectedSeats / 2);

        for (let i = 0; i < numSelectedSeats; i++) {
            let row, col;

            if (i < halfNumSelectedSeats) {
                row = middleRow - 1;
                col = middleCol - halfNumSelectedSeats + i;
            } else {
                row = middleRow;
                col = middleCol - halfNumSelectedSeats + i - halfNumSelectedSeats;
            }
            const index = row * totalCols + col;
            recommendedSeats.push(index);
        }

        recommendedSeats.forEach(index => {
            seats[index].isSelected = true;
        });

        return seats;
    };

    const [seats, setSeats] = useState(generateRandomSeats());

    // Funktsioon, et genereerida kasutajale istekohad
    const handleSeatSelect = (index) => {
        if (seats[index].isBooked) {
            return; // Do not select booked seats
        }

        const updatedSeats = [...seats];
        updatedSeats[index].isSelected = !updatedSeats[index].isSelected;

        // Kontroll, et saaks ainult õige arvu istmeid
        let selectedCount = 0;
        updatedSeats.forEach(seat => {
            if (seat.isSelected) {
                selectedCount++;
            }
        });

        if (selectedCount > numSelectedSeats) {
            // Kui tahetakse rohkem istekohti panna siis võtame viimase kohta ära
            updatedSeats[index].isSelected = !updatedSeats[index].isSelected;
        }

        setSeats(updatedSeats);
    };

    const handlePurchase = async () => {
        if (isLoggedIn) {
            try {
                const response = await fetch(`http://localhost:8080/auth/${userId}/addMovie/${movie.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        //
                    })
                });

                if (response.ok) {
                    console.log("Purchase confirmed.");
                } else {
                    console.error("Failed to confirm purchase.");
                }
            } catch (error) {
                console.error("Error occurred while confirming purchase:", error);
            }
        } else {
            // kasutaja pole sisse logitud, ehk ei lisa talle ajalukku filmi
            // TODO Link avalehele
        }
    };


        return (
        <div>
            <h1 className="text-3xl font-bold m-5 text-gray-700">3. Istekohad</h1>
            <p className="m-5 text-xl text-gray-700">Ekraan</p>
            <div className="grid grid-cols-10 gap-1">
                {seats.map((seat, index) => (
                    <Seat
                        key={index}
                        isBooked={seat.isBooked}
                        isSelected={seat.isSelected}
                        onClick={() => handleSeatSelect(index)}
                    />
                ))}
            </div>
            <button onClick={onBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">Tagasi kinokavasse</button>
            <button onClick={handlePurchase} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 ml-4">Kinnita ost</button>
        </div>
    );
};

export default SeatsPlan;
