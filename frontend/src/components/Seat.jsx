import React from 'react';

const Seat = ({ isBooked, isSelected, onClick }) => {
    const baseClass = 'w-8 h-8 m-1 rounded-full cursor-pointer';

    return (
        <div
            className={`${baseClass} ${
                isBooked ? 'bg-red-500' : isSelected ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            onClick={onClick}
        />
    );
};

export default Seat;
