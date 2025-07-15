import React, { useEffect, useState } from 'react';
import { getProperties } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties().then(setProperties).catch(console.error);
  }, []);

  return (
    <div>

      {/* Hero section */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">🏠 Bienvenue sur Agence Immo</h1>
          <p className="lead">Trouvez votre futur logement en toute confiance</p>
        </div>
      </section>

      {/* Recherche rapide (placeholder future section) */}
      <section className="bg-light py-4">
        <div className="container text-center">
          <h2>🔍 Recherchez un bien</h2>
          <p>Filtres par ville, type, prix... (à venir)</p>
        </div>
      </section>

      {/* Propriétés listées */}
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">📋 Nos biens disponibles</h2>

          {properties.length === 0 ? (
            <p>Aucun bien disponible actuellement.</p>
          ) : (
            <div className="row">
              {properties.map((property) => (
                <div key={property.id} className="col-md-4 mb-4">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact rapide */}
      <section className="bg-secondary text-white text-center py-5">
        <div className="container">
          <h2>📞 Une question ? Une visite ?</h2>
          <p>Contactez notre équipe pour plus d’infos ou programmer une visite.</p>
          <button className="btn btn-light mt-3">Contactez-nous</button>
        </div>
      </section>

    </div>
  );
}
