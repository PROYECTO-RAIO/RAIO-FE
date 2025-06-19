import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

export const getAllMensajesReverberados = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/mensajes-reverberados`);
    return data;
  } catch (error) {
    console.error("Error al obtener las reverberaciones");
    throw error;
  }
};

export const getMensajeReverberadoById = async (idReverberacion) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/mensajes-reverberados/${idReverberacion}`
    );
    return data;
  } catch (error) {
    console.error("Error al obtener la reverberación por Id");
    throw error;
  }
};

export const getMensajeOriginalById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/mensajes-originales/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el mensaje original", error);
    throw error;
  }
};

export const getAllMensajesOriginales = async () => {
  try {
    const responses = await axios.get(`${BASE_URL}/mensajes-originales`);
    return responses.data;
  } catch (error) {
    console.error("Error al obtener los mensajes originales", error);
  }
};

export const getAllCategorias = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías", error);
  }
};

export const getCategoriaById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error al obtener la categoria por id", error);
  }
};
