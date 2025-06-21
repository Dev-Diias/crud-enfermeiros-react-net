import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./Views/HomePage";
import EnfermeirosListPage from "./Views/Enfermeiros/EnfermeirosListPage";
import HospitaisListPage from "./Views/Hospitais/HospitaisListPage";
import LoginPage from "./Views/Auth/LoginPage";
import RegisterPage from "./Views/Auth/RegisterPage";
import authService from "./Services/authService";

import "./App.css"; // Mantenha seu CSS global se tiver

function App() {
  const isAuthenticated = !!authService.getCurrentUser();

  return (
    <Router>
      <div className="App">
        <Navbar />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <HomePage /> : <Navigate to="/login" />
              }
            />
            <Route path="/enfermeiros" element={<EnfermeirosListPage />} />
            <Route path="/hospitais" element={<HospitaisListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
