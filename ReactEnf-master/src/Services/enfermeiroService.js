import axios from "axios";

const API_URL = "https://localhost:7139/api/Enfermeiros";

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const enfermeiroService = {
  getAllEnfermeiros: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar enfermeiros:", error);
      throw error;
    }
  },

  getEnfermeiroById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar enfermeiro com ID ${id}:`, error);
      throw error;
    }
  },

  createEnfermeiro: async (enfermeiroData) => {
    try {
      const response = await axios.post(API_URL, enfermeiroData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar enfermeiro:", error);
      throw error;
    }
  },

  updateEnfermeiro: async (id, enfermeiroData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, enfermeiroData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar enfermeiro com ID ${id}:`, error);
      throw error;
    }
  },

  deleteEnfermeiro: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar enfermeiro com ID ${id}:`, error);
      throw error;
    }
  },
};

export default enfermeiroService;
