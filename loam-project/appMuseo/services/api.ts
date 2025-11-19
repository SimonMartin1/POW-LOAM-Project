// services/api.ts

// 1. Obtenemos la URL del .env (ej. http://192.168.1.15:8000/api)
const API_URL = process.env.EXPO_PUBLIC_API_URL;


export type ObraFromBackend = {
  id: number;        
  title: string;
  category: string;
  image_url: string; 
  description?: string;
};

// --- FUNCIONES PARA LLAMAR AL BACKEND ---

// 1. Obtener todas las obras
export const getObras = async (): Promise<ObraFromBackend[]> => {
  try {
    const response = await fetch(`${API_URL}/obras`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo obras:", error);
    throw error;
  }
};

// 2. Obtener una obra por ID 
export const getObraById = async (id: string): Promise<ObraFromBackend> => {
  try {
    const response = await fetch(`${API_URL}/obras/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error obteniendo obra ${id}:`, error);
    throw error;
  }
};