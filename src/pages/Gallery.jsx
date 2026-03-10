/**
 * Gallery.jsx
 * ====================================================================
 * PÁGINA / CONTENEDOR PRINCIPAL - Orquestador de la galería
 * ====================================================================
 * 
 * Responsabilidad ÚNICA: Componer la página completa:
 * - Obtener datos (useCatData)
 * - Gestionar interacciones (useCatLikes)
 * - Gestionar UI (useCatModal)
 * - Pasar props a componentes hijos
 * 
 * Esta página NO tiene lógica de negocio compleja,
 * solo orquesta los hooks y componentes.
 * 
 * @module Gallery
 */

import React from "react";
import "../styles/gallery.css";

// Importamos SERVICIOS (funciones puras)
import { getImageUrl, getVideoUrl, getPdfUrl } from "../services/catService";

// Importamos HOOKS (lógica con estado)
import { useCatData } from "../hooks/useCatData";
import { useCatLikes } from "../hooks/useCatLikes";
import { useCatModal } from "../hooks/useCatModal";

// Importamos COMPONENTES (UI)
import CatCard from "../components/CatCard";
import CatDetail from "../components/CatDetail";

/**
 * Página principal de la galería de gatos.
 * Orquesta todos los hooks y componentes.
 * 
 * @returns {JSX.Element}
 */
export default function Gallery() {
  // ============================================
  // 1. HOOK DE DATOS - Información de gatos
  // ============================================
  const { 
    cats,           // Array: [{ file, name, desc }, ...]
    loading,        // boolean: true mientras carga
    errors,         // object: { nombre: true } si imagen falló
    registerError   // function: (name) => marca error
  } = useCatData();

  // ============================================
  // 2. HOOK DE LIKES - Interacción de favoritos
  // ============================================
  const { 
    liked,          // object: { nombre: true/false }
    likedCount,     // number: total de favoritos
    toggleLike      // function: (name) => alterna like
  } = useCatLikes();

  // ============================================
  // 3. HOOK DE MODAL - UI del detalle
  // ============================================
  const { 
    selected,       // object|null: gato en modal o null
    selectCat,      // function: (cat) => abre modal
    closeCat        // function: () => cierra modal
  } = useCatModal();

  // ============================================
  // Renderizado condicional (loading)
  // ============================================
  if (loading) {
    return (
      <div 
        style={{ 
          color: "#8a7060", 
          textAlign: "center", 
          padding: "80px 0", 
          fontFamily: "DM Sans, sans-serif" 
        }}
        role="status"
        aria-label="Cargando razas de gatos"
      >
        Cargando razas…
      </div>
    );
  }

  // ============================================
  // Renderizado principal
  // ============================================
  return (
    <>
      {/* ── HERO: Encabezado de la página ───────────────────── */}
      <div className="hero">
        {/* Elementos decorativos (huellas) */}
        <div className="paw-bg" style={{ top: 20, left: "10%" }}>🐾</div>
        <div className="paw-bg" style={{ top: 60, right: "8%", animationDelay: "3s" }}>🐾</div>

        <div className="hero-tag">Azure Blob Storage · cats</div>
        <h1 className="hero-title">
          Nuestros<br /><em>Gaticos</em>
        </h1>
        <p className="hero-sub">
          {cats.length} razas · imágenes servidas desde Azure
        </p>
        <div className="divider" />
      </div>

      {/* ── CONTADOR DE FAVORITOS (solo si hay) ─────────────── */}
      {likedCount > 0 && (
        <div 
          className="count-bar"
          role="status"
          aria-label={`${likedCount} gatos favoritos`}
        >
          ❤️ Has marcado {likedCount} gato
          {likedCount > 1 ? "s" : ""} como favorito
          {likedCount > 1 ? "s" : ""}
        </div>
      )}

      {/* ── GRID DE TARJETAS ─────────────────────────────────── */}
      <div className="grid" role="list" aria-label="Galería de razas">
        {cats.map((cat) => (
          <CatCard
            key={cat.name} // 🟢 Identificador único
            // Datos del gato
            cat={cat}
            // URL generada por el SERVICIO (no por hook)
            imageUrl={getImageUrl(cat.file)}
            // Estados
            liked={!!liked[cat.name]}
            hasError={!!errors[cat.name]}
            // Callbacks (eventos hacia arriba)
            onSelect={selectCat}
            onToggleLike={() => toggleLike(cat.name)}
            onImageError={() => registerError(cat.name)}
          />
        ))}
      </div>

      {/* ── MODAL DE DETALLE (solo si hay gato seleccionado) ── */}
      {selected && (
        <CatDetail
          // Datos del gato seleccionado
          cat={selected}
          // URLs generadas por SERVICIOS
          imageUrl={getImageUrl(selected.file)}
          videoUrl={getVideoUrl(selected.name)}
          pdfUrl={getPdfUrl(selected.name)}
          // Estado de error
          hasError={!!errors[selected.name]}
          // Callback para cerrar
          onClose={closeCat}
        />
      )}
    </>
  );
}