/**
 * useCats.js
 * ====================================================================
 * HOOK PERSONALIZADO - Gestión unificada de la galería de gatos
 * ====================================================================
 * 
 * Este hook encapsula toda la lógica de estado de la galería:
 * - Obtención de datos (cats, loading, errores)
 * - Interacción de likes (favoritos)
 * - Control del modal de detalle
 * - Construcción de URLs para imágenes, videos y PDFs
 * 
 * Principios aplicados:
 * - Separación de la lógica de negocio de la presentación (UI)
 * - Reutilización de lógica entre componentes
 * 
 * @module useCats
 */

import { useState, useEffect } from "react";
import { getCats, getImageUrl, getVideoUrl, getPdfUrl } from "../services/catService";

/**
 * Hook personalizado que gestiona todo el estado de la galería.
 * 
 * @returns {Object} - Estado y funciones para la galería
 * @property {Array} cats - Lista de objetos raza obtenidos del servicio
 * @property {boolean} loading - Indica si los datos están cargando
 * @property {Object} liked - Registro de likes por raza (clave: nombre, valor: boolean)
 * @property {Object} errors - Registro de errores de imagen por raza (clave: nombre, valor: boolean)
 * @property {Object|null} selected - Gato seleccionado para el modal (o null si cerrado)
 * @property {number} likedCount - Número total de gatos con like (calculado)
 * @property {Function} toggleLike - Alterna el like de una raza por su nombre
 * @property {Function} selectCat - Abre el modal con el gato seleccionado
 * @property {Function} closeCat - Cierra el modal
 * @property {Function} registerError - Registra que la imagen de una raza falló al cargar
 * @property {Function} getImageUrl - Construye URL de imagen (delega al servicio)
 * @property {Function} getVideoUrl - Construye URL de video (delega al servicio)
 * @property {Function} getPdfUrl - Construye URL de PDF (delega al servicio)
 */
export function useCats() {
  // ============================================
  // Estados
  // ============================================
  
  /** @type {Array} Lista de gatos cargada desde el servicio */
  const [cats, setCats] = useState([]);
  
  /** @type {boolean} Control de carga */
  const [loading, setLoading] = useState(true);
  
  /** @type {Object} Estado de likes de cada gato */
  const [liked, setLiked] = useState({});
  
  /** @type {Object} Gato seleccionado para el modal (null = cerrado) */
  const [selected, setSelected] = useState(null);
  
  /** @type {Object} Errores de carga de imágenes por gato */
  const [errors, setErrors] = useState({});

  // ============================================
  // Efecto de carga inicial (solo se ejecuta una vez)
  // ============================================
  useEffect(() => {
    getCats().then((data) => {
      setCats(data);
      setLoading(false);
    });
  }, []); // 🟢 Array vacío = solo al montar

  // ============================================
  // Funciones de actualización
  // ============================================
  
  /**
   * Alterna el estado de "me gusta" de un gato.
   * @param {string} name - Nombre de la raza
   */
  const toggleLike = (name) => {
    setLiked((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  /**
   * Abre el modal con los datos del gato seleccionado.
   * @param {Object} cat - Objeto raza
   */
  const selectCat = (cat) => {
    setSelected(cat);
  };

  /**
   * Cierra el modal (establece selected a null).
   */
  const closeCat = () => {
    setSelected(null);
  };

  /**
   * Registra un error de carga de imagen para un gato específico.
   * @param {string} name - Nombre de la raza
   */
  const registerError = (name) => {
    setErrors((prev) => ({ ...prev, [name]: true }));
  };

  // ============================================
  // Valores derivados
  // ============================================
  
  /** Número total de gatos con like (calculado a partir del estado liked) */
  const likedCount = Object.values(liked).filter(Boolean).length;

  // ============================================
  // Retorno del hook
  // ============================================
  return {
    // Estados
    cats,
    loading,
    liked,
    errors,
    selected,
    
    // Valor derivado
    likedCount,
    
    // Funciones de actualización
    toggleLike,
    selectCat,
    closeCat,
    registerError,
    
    // Utilidades de URL (delegadas al servicio)
    getImageUrl,
    getVideoUrl,
    getPdfUrl,
  };
}