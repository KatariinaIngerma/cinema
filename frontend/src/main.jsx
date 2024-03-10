import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginForm from "./components/LoginComponents/Login";
import Profile from "./components/ProfileComponents/Profile.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<App />} />
        </Routes>
    </Router>

)
