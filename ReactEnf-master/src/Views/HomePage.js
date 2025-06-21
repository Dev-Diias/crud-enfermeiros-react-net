import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Bem-vindo ao Sistema de Gestão de Enfermagem</h1>
      <p className="lead">Selecione uma opção para começar:</p>
      <nav className="mt-4">
        <ul className="list-unstyled">
          {" "}
          <li className="mb-3">
            {" "}
            <Link to="/enfermeiros" className="btn btn-primary btn-lg">
              Gerenciar Enfermeiros
            </Link>
          </li>
          <li>
            <Link to="/hospitais" className="btn btn-success btn-lg">
              Gerenciar Hospitais
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
