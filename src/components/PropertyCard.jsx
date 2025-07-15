import React from 'react';

export default function PropertyCard({ property }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{property.titre}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{property.type} • {property.statut}</h6>
        <p className="card-text">
          <strong>Prix:</strong> {property.prix} FCFA<br />
          <strong>Surface:</strong> {property.surface} m²<br />
          <strong>Pièces:</strong> {property.pieces}<br />
          <strong>Ville:</strong> {property.localisation}
        </p>
      </div>
    </div>
  );
}
