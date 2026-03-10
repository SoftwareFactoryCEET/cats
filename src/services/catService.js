/**
 * catService.js
 * ====================================================================
 * CAPA DE SERVICIOS - Acceso a datos y utilidades de URL
 * ====================================================================
 * 
 * Responsabilidad ÚNICA: Abstraer el acceso a los datos y recursos.
 * - No tiene estado
 * - No conoce React
 * - Funciones puras y reutilizables
 * - Fácil de testear y mockear
 * 
 * Principios SOLID:
 * - S: Single Responsibility (solo acceso a datos)
 * - D: Dependency Inversion (la UI no depende de la fuente de datos)
 * 
 * @module catService
 */

// URL base del contenedor público de Azure Blob Storage
// Se obtiene de variables de entorno para seguridad y flexibilidad
export const STORAGE_URL = import.meta.env.VITE_AZURE_STORAGE_URL;

/**
 * Obtiene el catálogo completo de razas de gatos.
 * 
 * En producción, esto sería un fetch a una API REST.
 * Por ahora, simulamos una llamada asíncrona para mantener
 * el mismo patrón que usaríamos con un backend real.
 * 
 * @async
 * @returns {Promise<Array>} Lista de objetos raza
 * @example
 * const cats = await getCats();
 * // Retorna: [{ file: "Persa.jpg", name: "Persa", desc: "..." }, ...]
 */
export async function getCats() {
  // Simula latencia de red y patrón asíncrono
  return Promise.resolve([
    {
      file: "Abisinio.jpg",
      name: "Abisinio",
      desc: "Ágil y curioso, siempre en movimiento",
    },
    {
      file: "Bengala.jpg",
      name: "Bengala",
      desc: "Salvaje por fuera, tierno por dentro",
    },
    {
      file: "Maine_Coon.jpg",
      name: "Maine Coon",
      desc: "El gigante gentil de los gatos",
    },
    {
      file: "Pelo_Corto.jpg",
      name: "Pelo Corto",
      desc: "Elegante y de bajo mantenimiento",
    },
    {
      file: "Persa.jpg",
      name: "Persa",
      desc: "Majestuoso y tranquilo como un rey",
    },
    {
      file: "Ragdoll.jpg",
      name: "Ragdoll",
      desc: "Se derrite entre tus brazos",
    },
    {
      file: "Siames.jpg",
      name: "Siamés",
      desc: "Vocal, social y muy inteligente",
    },
    {
      file: "Sphynx.jpg",
      name: "Sphynx",
      desc: "Sin pelo, lleno de amor y calor",
    },
  ]);
}

/**
 * Construye la URL completa de la imagen para una raza.
 * Función pura: mismo input → mismo output.
 * 
 * @param {string} file - Nombre del archivo (ej. "Persa.jpg")
 * @returns {string} URL pública del Blob Storage
 * @example
 * getImageUrl("Persa.jpg") 
 * // → "https://storage.com/cats/Persa.jpg"
 */
export function getImageUrl(file) {
  return `${STORAGE_URL}/cats/${file}`;
}

/**
 * Construye la URL completa del video para una raza.
 * 
 * @param {string} name - Nombre de la raza (ej. "Persa")
 * @returns {string} URL pública del video en Blob Storage
 * @example
 * getVideoUrl("Persa")
 * // → "https://storage.com/cats-video/Persa.mp4"
 */
export function getVideoUrl(name) {
  return `${STORAGE_URL}/cats-video/${name}.mp4`;
}

/**
 * Construye la URL completa del PDF de ficha técnica.
 * 
 * @param {string} name - Nombre de la raza (ej. "Persa")
 * @returns {string} URL pública del PDF en Blob Storage
 * @example
 * getPdfUrl("Persa")
 * // → "https://storage.com/cats-pdf/Ficha_Persa.pdf"
 */
export function getPdfUrl(name) {
  return `${STORAGE_URL}/cats-pdf/Ficha_${name}.pdf`;
}