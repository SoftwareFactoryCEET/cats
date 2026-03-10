/**
 * CatCard.jsx
 * Componente de presentación: tarjeta individual de gato.
 */
import React from "react";
import PropTypes from "prop-types";

export default function CatCard({
  cat,
  imageUrl,
  liked,
  hasError,
  onSelect,
  onToggleLike,
  onImageError,
}) {
  return (
    <div
      className="card"
      onClick={() => onSelect(cat)}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalle de ${cat.name}`}
    >
      <div className="card-img-wrap">
        {hasError ? (
          <div className="img-error" aria-label="Imagen no disponible">
            🐱
            <span>Imagen no encontrada</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={cat.name}
            onError={onImageError}
            loading="lazy"
          />
        )}
        <div className="card-overlay" />
      </div>

      <div className="card-body">
        <div className="card-name">{cat.name}</div>
        <div className="card-desc">{cat.desc}</div>
      </div>

      <div className="card-footer">
        <span className="badge">Ver detalle →</span>
        <button
          className="heart-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          aria-label={liked ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

CatCard.propTypes = {
  cat: PropTypes.shape({
    file: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
  imageUrl: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggleLike: PropTypes.func.isRequired,
  onImageError: PropTypes.func.isRequired,
};