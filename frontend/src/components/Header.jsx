import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
    return (
        <header className="flex justify-between items-center py-4 px-6 bg-red-500 text-white fixed top-0 left-0 right-0 w-full">
            <Link to="/">
                <h1 className="text-2xl font-bold cursor-pointer">Kino</h1>
            </Link>
            <div>
                {isLoggedIn ? (
                    <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Logi välja
                    </button>
                ) : (
                    <Link to="/login">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Logi sisse
                        </button>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
