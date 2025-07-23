import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardGestionnaire.css';
import Properties from '../components/Property'; // <-- importe le composant Property

export default function DashboardGestionnaire() {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 sidebar">
        <h4 className="text-center">Agence Immo</h4>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <button
              className={`nav-link text-white btn btn-link ${selectedSection === 'dashboard' ? 'fw-bold' : ''}`}
              onClick={() => setSelectedSection('dashboard')}
            >
              🏠 Tableau de bord
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white btn btn-link ${selectedSection === 'properties' ? 'fw-bold' : ''}`}
              onClick={() => setSelectedSection('properties')}
            >
              📦 Propriétés
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link text-white btn btn-link">👥 Clients</button>
          </li>
          <li className="nav-item">
            <button className="nav-link text-white btn btn-link">⚙️ Paramètres</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
          <h5>Bienvenue, Gestionnaire</h5>
          <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
        </div>

        <div className="p-4">
          {selectedSection === 'dashboard' && (
            <>
              {/* Stat Cards */}
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="card text-white bg-primary mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Propriétés</h5>
                      <p className="card-text">34 propriétés listées</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-white bg-success mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Clients</h5>
                      <p className="card-text">12 clients enregistrés</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-white bg-warning mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Visites planifiées</h5>
                      <p className="card-text">7 à venir</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table des propriétés */}
              <div className="card">
                <div className="card-header">
                  Dernières propriétés ajoutées
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Titre</th>
                        <th>Type</th>
                        <th>Prix</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Appartement F3</td>
                        <td>Location</td>
                        <td>250 000 FCFA</td>
                        <td>15/07/2025</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Villa luxe</td>
                        <td>Vente</td>
                        <td>150 000 000 FCFA</td>
                        <td>12/07/2025</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {selectedSection === 'properties' && (
            <Properties />
          )}
        </div>
      </div>
    </div>
  );
}
