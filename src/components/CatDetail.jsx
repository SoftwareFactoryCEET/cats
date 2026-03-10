/**
 * CatDetail.jsx
 * Componente de presentación: modal de detalle de gato.
 */
import React from "react";
import PropTypes from "prop-types";

export default function CatDetail({
  cat,
  imageUrl,
  videoUrl,
  pdfUrl,
  hasError,
  onClose,
}) {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      aria-label="Cerrar modal"
      role="button"
      tabIndex={0}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {hasError ? (
          <div
            style={{
              height: 360,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 80,
              background: "#0f0a06",
            }}
            aria-label="Imagen no disponible"
          >
            🐱
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={cat.name}
            style={{ width: "100%", display: "block" }}
          />
        )}

        <div className="modal-body">
          <div id="modal-title" className="modal-name">
            {cat.name}
          </div>
          <div className="modal-desc">{cat.desc}</div>
          <div className="modal-url">{imageUrl}</div>

          <video
            controls
            style={{
              width: "100%",
              borderRadius: 10,
              marginBottom: 14,
              background: "#0f0a06",
            }}
            aria-label={`Video de ${cat.name}`}
          >
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta video HTML5.
          </video>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              background: "#0f0a06",
              border: "1px solid #2a1f12",
              borderRadius: 8,
              padding: "10px 14px",
              fontFamily: "monospace",
              fontSize: 11,
              color: "#c8702a",
              wordBreak: "break-all",
              marginBottom: 16,
              textDecoration: "none",
            }}
            aria-label={`Ficha técnica PDF de ${cat.name}`}
          >
            📄 Ficha técnica PDF → {pdfUrl}
          </a>

          <button className="modal-close" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

CatDetail.propTypes = {
  cat: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
  }).isRequired,
  imageUrl: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  pdfUrl: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};