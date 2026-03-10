/**
 * useCatModal.js
 * ====================================================================
 * HOOK DE UI - Gestiona el estado del modal de detalle
 * ====================================================================
 * 
 * Responsabilidad ÚNICA: Controlar qué gato está seleccionado
 * y las acciones de abrir/cerrar el modal.
 * 
 * Este hook NO sabe de:
 * - Datos de los gatos (solo guarda el objeto que recibe)
 * - Likes
 * - URLs
 * 
 * @module useCatModal
 */

import { useState } from "react";

/**
 * Hook personalizado para gestionar el modal de detalle de gatos.
 * 
 * @returns {Object} Estado y funciones para el modal
 * @property {Object|null} selected - Gato actualmente seleccionado o null
 * @property {Function} selectCat - Abre el modal con un gato específico
 * @property {Function} closeCat - Cierra el modal (selected = null)
 */
export function useCatModal() {
  // ============================================
  // Estados
  // ============================================
  
  /** 
   * @type {Object|null} Gato seleccionado para mostrar en modal
   * @example { file: "Persa.jpg", name: "Persa", desc: "..." } o null
   */
  const [selected, setSelected] = useState(null);

  // ============================================
  // Funciones de actualización
  // ============================================
  
  /**
   * Abre el modal estableciendo el gato seleccionado.
   * 
   * @param {Object} cat - Objeto raza a mostrar en el modal
   * @returns {void}
   * @example
   * selectCat({ name: "Persa", file: "Persa.jpg", desc: "..." });
   */
  const selectCat = (cat) => {
    setSelected(cat);
  };

  /**
   * Cierra el modal estableciendo selected a null.
   * 
   * @returns {void}
   */
  const closeCat = () => {
    setSelected(null);
  };

  // ============================================
  // Retorno
  // ============================================
  
  return {
    selected,    // Gato seleccionado (o null)
    selectCat,   // Función para abrir
    closeCat,    // Función para cerrar
  };
}