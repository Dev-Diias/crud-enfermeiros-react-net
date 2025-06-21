import axios from "axios";

const AUTH_API_URL = "https://localhost:7186/api/Auth";

const authService = {
  login: async (nomeUsuario, senha) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/login`, {
        nomeUsuario,
        senha,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${AUTH_API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
