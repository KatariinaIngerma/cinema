import React, { useState } from 'react';
import Header from "../Header.jsx";
import axios from "axios";
import {data} from "autoprefixer";

const LoginForm = ({  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        // Login
        axios.post('http://localhost:8080/auth/signin', { email, password })
            .then(response => {
                document.cookie = `jwt=${response.data.jwt}; Secure; SameSite=Strict`;
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        // post request et kasutaja registreerida
        axios.post('http://localhost:8080/auth/signup', { email, password })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Registration error:', error);
            });
    };

    return (
        <div>
            <Header
                isLoggedIn={isLoggedIn}
                //onLogin={handleLoginSubmit}
               // onLogout={handleLogout}
            />
            <h1 className="text-3xl font-bold mt-20 text-gray-700">Logi sisse või registreeru</h1>
            <form className="w-80 mx-auto mt-10 ">
                <div className="mb-4">
                    <label htmlFor="username" className="text-lg font-bold block text-gray-700 m-5">Email:</label>
                    <input type="text" id="username" value={email} onChange={handleEmailChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-100" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="text-lg font-bold block text-gray-700 m-5">Parool:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-gray-100" />
                </div>
                <button type="submit" onClick={handleLoginSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 mt-5">Logi sisse</button>
                <button type="submit" onClick={handleRegisterSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Registreeru</button>
            </form>
        </div>
    );
};

export default LoginForm;
