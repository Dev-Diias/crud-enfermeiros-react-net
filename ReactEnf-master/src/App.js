// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Views/HomePage";
import EnfermeirosListPage from "./Views/Enfermeiros/EnfermeirosListPage";
import HospitaisListPage from "./Views/Hospitais/HospitaisListPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Sistema de Enfermagem
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/hospitais">
                    Hospitais
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/enfermeiros">
                    Enfermeiros
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hospitais" element={<HospitaisListPage />} />
            <Route path="/enfermeiros" element={<EnfermeirosListPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
