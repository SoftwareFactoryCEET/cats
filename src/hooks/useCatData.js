/**
 * useCatData.js
 * ====================================================================
 * HOOK DE DATOS - Gestiona la obtención y estado de los gatos
 * ====================================================================
 * 
 * Responsabilidad ÚNICA: Manejar todo lo relacionado con los datos
 * de los gatos (fetch, loading, errores de imagen).
 * 
 * Este hook NO sabe de:
 * - Likes (favoritos)
 * - Modal (UI)
 * - Construcción de URLs (eso es del servicio)
 * 
 * @module useCatData
 */

import { useState, useEffect } from "react";
import { getCats } from "../services/catService";

/**
 * Hook personalizado para gestionar datos de gatos.
 * 
 * @returns {Object} Estado y funciones para manejar datos de gatos
 * @property {Array} cats - Lista de objetos raza
 * @property {boolean} loading - Indica si los datos están cargando
 * @property {Object} errors - Registro de errores por raza { nombre: true/false }
 * @property {Function} registerError - Marca que una imagen falló al cargar
 */
export function useCatData() {
  // ============================================
  // Estados
  // ============================================
  
  /** @type {Array} Lista de gatos obtenidos de la API */
  const [cats, setCats] = useState([]);
  
  /** @type {boolean} Control de carga para mostrar spinner */
  const [loading, setLoading] = useState(true);
  
  /** 
   * @type {Object} Registro de errores de carga de imágenes
   * @example { "Persa": true, "Siamés": false }
   */
  const [errors, setErrors] = useState({});

  // ============================================
  // Efectos
  // ============================================
  
  /**
   * Efecto de montaje: carga los datos al iniciar el componente.
   * Solo se ejecuta UNA VEZ gracias al array de dependencias vacío.
   */
  useEffect(() => {
    getCats().then((data) => {
      setCats(data);        // Guardamos los gatos
      setLoading(false);    // Terminó la carga
    });
  }, []); // 🟢 Solo al montar

  // ============================================
  // Funciones de actualización
  // ============================================
  
  /**
   * Registra que la imagen de una raza específica falló al cargar.
   * Esto permite mostrar un placeholder en lugar de la imagen rota.
   * 
   * @param {string} name - Nombre de la raza que falló
   * @returns {void}
   */
  const registerError = (name) => {
    setErrors((prev) => ({ ...prev, [name]: true }));
  };

  // ============================================
  // Retorno
  // ============================================
  
  return {
    cats,           // Lista principal de datos
    loading,        // Estado de carga
    errors,         // Errores de imagen
    registerError,  // Función para reportar errores
  };
}