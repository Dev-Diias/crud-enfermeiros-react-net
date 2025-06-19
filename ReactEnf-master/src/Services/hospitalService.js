import axios from "axios";

const API_URL = "https://localhost:7139/api/Hospitais";

const hospitalService = {
  getAllHospitais: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar hospitais:", error);
      throw error;
    }
  },

  getHospitalById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar hospital com ID ${id}:`, error);
      throw error;
    }
  },

  createHospital: async (hospitalData) => {
    try {
      const response = await axios.post(API_URL, hospitalData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar hospital:", error);
      throw error;
    }
  },

  updateHospital: async (id, hospitalData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, hospitalData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar hospital com ID ${id}:`, error);
      throw error;
    }
  },

  deleteHospital: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar hospital com ID ${id}:`, error);
      throw error;
    }
  },
};

export default hospitalService;
