import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import customerIcon from '../assets/icons8-customer-32.png';


const Header = ({ isLoggedIn, onLogout, email })=> {
    return (
        <header className="flex justify-between items-center py-4 px-6 bg-red-500 text-white fixed top-0 left-0 right-0 w-full">
            <Link to="/">
                <h1 className="text-2xl font-bold cursor-pointer">Kino</h1>
            </Link>
            <div className="flex items-center">
                {isLoggedIn && (

                    <Link to="/profile">
                        <img src={customerIcon} alt="Customer Icon" className="w-6 h-6 mr-4"/>
                    </Link>
                )}
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
