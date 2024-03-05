import React, { useState } from 'react';
import Seat from './Seat';

const SeatsPlan = ({ onSeatClick, onBack, numSelectedSeats }) => {
    const totalRows = 8;
    const totalCols = 10;
    const totalSeats = totalRows * totalCols;

    // genereerime istekohad
    const generateRandomSeats = () => {
        const seats = [];

        // Genereeri broneeritud kohad
        const bookedSeats = 25; // 25 kohta on juba brneeritud
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

    // Function to handle seat selection
    const handleSeatSelect = (index) => {
        if (seats[index].isBooked) {
            return; // Do not select booked seats
        }

        const updatedSeats = [...seats];
        updatedSeats[index].isSelected = !updatedSeats[index].isSelected;

        // Ensure only numSelectedSeats number of seats can be selected
        let selectedCount = 0;
        updatedSeats.forEach(seat => {
            if (seat.isSelected) {
                selectedCount++;
            }
        });

        if (selectedCount > numSelectedSeats) {
            // If more seats are selected than allowed, deselect the last selected seat
            updatedSeats[index].isSelected = !updatedSeats[index].isSelected;
        }

        setSeats(updatedSeats);
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
            <button onClick={onBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 ml-4">Kinnita ost</button>
        </div>
    );
};

export default SeatsPlan;
