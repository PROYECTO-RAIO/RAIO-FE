import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";

/*GET 
Mensaje reverberado by id
Mensaje original by id

GET ALL
Mensajes originales: página principal
mensajes reverberados asociados
*/

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
    console.error("Error al obtener el mensaje original:", error);
    throw error;
  }
};

export const getAllMensajesOriginales = async() => {
  try {
    const responses = await axios.get(`${BASE_URL}/mensajes-originales`);
    return responses.data
  } catch (error) {
    console.error("Error al obtener los mensajes originales", error)
  }
}
