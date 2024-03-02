import React from 'react';

function Header({ isLoggedIn, onLogin, onLogout }) {
    return (
        <header className="flex justify-between items-center py-4 px-6 bg-red-500 text-white fixed top-0 left-0 right-0 w-full">
            <h1 className="text-2xl font-bold">Kino</h1>
            <div>
                {isLoggedIn ? (
                    <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Logi välja
                    </button>
                ) : (
                    <button onClick={onLogin} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Logi sisse
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
