import React, { useEffect, useState } from 'react';
import Header from "../Header.jsx";
import App, { getCurrentUser } from "../../App.jsx";
import {handleLogout} from "../../App.jsx";

// Tabel vaatamisajaloo jaoks
function MovieHistoryTable({ userHistory }) {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full text-gray-900 rounded-md">
                <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-4 border-none">Nimi</th>
                    <th className="px-4 py-2 border-none">Žanr</th>
                    <th className="px-4 py-2 border-none">Vanusepiirang</th>
                    <th className="px-4 py-2 border-none">Keel</th>
                    <th className="px-4 py-2 border-none">Kuupäev</th>
                    <th className="px-4 py-2 border-none">Kellaaeg</th>
                </tr>
                </thead>
                <tbody>
                {userHistory.map((movie, index) => (
                    <tr key={index} className="bg-white border-b border-gray-200">
                        <td className="px-4 py-2 border-none">{movie.title}</td>
                        <td className="px-4 py-2 border-none">{movie.genre}</td>
                        <td className="px-4 py-2 border-none">{movie.ageRating}</td>
                        <td className="px-4 py-2 border-none">{movie.language}</td>
                        <td className="px-4 py-2 border-none">{new Date(movie.screeningDate).toLocaleDateString()}</td>
                        <td className="px-4 py-2 border-none">{movie.screeningTime}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

const Profile = ( ) => {
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userHistory, setUserHistory] = useState([]);

    useEffect(() => {
        getCurrentUser()
            .then(userData => {
                setEmail(userData.email);
                setUserId(userData.id);
                setIsLoggedIn(true);
                setUserHistory(userData.history);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
            });
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto mt-16 text-gray-700 px-4">
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            {isLoggedIn ? (
                <div className="max-w-6xl bg-white shadow-md rounded px-8 py-6 mx-auto">
                    <h2 className="text-3xl font-semibold mb-4">Minu profiil</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <p className="text-black">{email}</p>
                        <p>Kasutaja ID: {userId}</p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Minu vaatamiste ajalugu</h2>
                        {userHistory.length > 0 ? (
                            <MovieHistoryTable userHistory={userHistory} />
                        ) : (
                            <p>Vaatamiste ajalugu puudub</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded px-8 py-6 mx-auto">
                    <p>Logi sisse</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
