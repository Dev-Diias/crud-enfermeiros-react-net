import React, { useState } from "react";
import authService from "../../Services/authService";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const userData = {
        nomeUsuario: username,
        email: email,
        senha: password,
        roleId: parseInt(roleId, 10),
      };

      const response = await authService.register(userData);
      console.log("Registro bem-sucedido!", response);
      setSuccessMessage(
        "Usuário registrado com sucesso! Você pode fazer login agora."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(
        "Erro no registro:",
        err.response ? err.response.data : err.message
      );
      setError(
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Erro ao registrar. Verifique os dados e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div
        className="card p-4 shadow-sm"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="card-title text-center mb-4">Registrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Nome de Usuário:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Senha:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="roleId" className="form-label">
              Tipo de Usuário (Role):
            </label>
            <select
              className="form-control"
              id="roleId"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              required
            >
              <option value="">Selecione uma Role</option>
              <option value="1">Admin</option>
              <option value="2">Enfermeiro</option>
              <option value="3">Padrão</option>
            </select>
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {successMessage && (
            <div className="alert alert-success mt-3">{successMessage}</div>
          )}
          <button
            type="submit"
            className="btn btn-success w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>
        <p className="text-center mt-3">
          Já tem uma conta? <Link to="/login">Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
