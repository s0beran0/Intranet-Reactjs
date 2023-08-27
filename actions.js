import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; 
import { setInsideVisible } from './src/components/moduleVisibilitySlice';


// Função para obter os dados iniciais
export const fetchEmployees = () => {
  return axios.get(`${API_BASE_URL}/employees`)
    .then(response => response.data)
    .catch(error => {
      console.error('Erro ao obter os dados do servidor:', error);
      throw error;
    });
};

// Função para excluir um funcionário
export const deleteEmployee = (id) => {
  return axios.delete(`${API_BASE_URL}/employees/${id}`)
    .catch(error => {
    dispatch(setInsideVisible(false));
      console.error('Erro ao excluir o usuário:', error);
      throw error;
    });
};

// Função para criar um novo funcionário
export const createEmployee = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/employees`, formData);
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      throw error;
    }
  };
