/**
 * useCatLikes.js
 * ====================================================================
 * HOOK DE INTERACCIÓN - Gestiona los favoritos (likes)
 * ====================================================================
 * 
 * Responsabilidad ÚNICA: Manejar el estado de "me gusta" de los gatos.
 * 
 * Este hook NO sabe de:
 * - Datos de los gatos (solo maneja nombres como clave)
 * - Modal
 * - URLs
 * 
 * @module useCatLikes
 */

import { useState, useMemo } from "react";

/**
 * Hook personalizado para gestionar favoritos de gatos.
 * 
 * @returns {Object} Estado y funciones para manejar likes
 * @property {Object} liked - Objeto con estados de like { nombre: boolean }
 * @property {number} likedCount - Número total de gatos con like
 * @property {Function} toggleLike - Alterna el like de un gato por su nombre
 */
export function useCatLikes() {
  // ============================================
  // Estados
  // ============================================
  
  /** 
   * @type {Object} Registro de likes por nombre de raza
   * @example { "Persa": true, "Siamés": false, "Bengala": true }
   */
  const [liked, setLiked] = useState({});

  // ============================================
  // Valores derivados (memoizados)
  // ============================================
  
  /**
   * Calcula el número total de gatos marcados como favoritos.
   * useMemo evita recalcular en cada render si liked no cambió.
   */
  const likedCount = useMemo(
    () => Object.values(liked).filter(Boolean).length,
    [liked] // Solo se recalcula cuando liked cambia
  );

  // ============================================
  // Funciones de actualización
  // ============================================
  
  /**
   * Alterna el estado de like de un gato específico.
   * 
   * @param {string} name - Nombre de la raza a alternar
   * @returns {void}
   * @example
   * toggleLike("Persa"); // Si era true → false, si era false → true
   */
  const toggleLike = (name) => {
    setLiked((prev) => ({ 
      ...prev,           // Mantiene los estados existentes
      [name]: !prev[name] // Invierte SOLO el de este gato
    }));
  };

  // ============================================
  // Retorno
  // ============================================
  
  return {
    liked,         // Estado de likes por gato
    likedCount,    // Contador total (derivado)
    toggleLike,    // Función para alternar
  };
}