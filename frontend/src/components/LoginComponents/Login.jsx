import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onLogin(username);
    };

    return (
        <form onSubmit={handleSubmit} className="w-64 mx-auto mt-10">
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Kasutajanimi:</label>
                <input type="text" id="username" value={username} onChange={handleUsernameChange} className="mt-1 p-2 block w-full rounded-md border-gray-300" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Parool:</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} className="mt-1 p-2 block w-full rounded-md border-gray-300" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
        </form>
    );
};

export default LoginForm;
