

/**
 * Lee y valida la URL de la API desde las variables de entorno.
 * @returns {string} La URL base limpia (sin slash final).
 */
export const getBaseUrl = (): string => {
    // 1. Intentamos leer la variable con el prefijo de Expo
    const url = 'http://192.168.0.102:8000'

    // 2. Validación de Seguridad:
    // Si la variable no existe (es undefined o string vacío), lanzamos un error
    // para que te des cuenta inmediatamente en desarrollo.
    if (!url) {
        const errorMessage = 
            "La variable URL no está definida en el archivo .env."
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    return url.replace(/\/$/, '');
};