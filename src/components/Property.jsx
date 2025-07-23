import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function Property() {
  const [proprietes, setProprietes] = useState([]);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    prix: '',
    surface: '',
    localisation: '',
    statut: '',
    type: '',
    pieces: '',
    images: [] // fichiers sélectionnés
  });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');
  
  const fileInputRef = useRef(null); // pour réinitialiser input file

  useEffect(() => {
    fetchProprietes();
  }, []);

  const fetchProprietes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/properties', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProprietes(response.data);
    } catch (error) {
      console.error('Erreur chargement propriétés', error);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        for (let i = 0; i < formData.images.length; i++) {
          data.append('images[]', formData.images[i]);
        }
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      if (editingId) {
        // Pour update, on utilise _method=PUT si le backend attend ça
        await axios.post(`http://localhost:8000/api/properties/${editingId}?_method=PUT`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('http://localhost:8000/api/properties', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Réinitialiser le formulaire et l'input fichier
      setFormData({
        titre: '',
        description: '',
        prix: '',
        surface: '',
        localisation: '',
        statut: '',
        type: '',
        pieces: '',
        images: []
      });
      if(fileInputRef.current) {
        fileInputRef.current.value = null; // clear champ file
      }

      setEditingId(null);
      fetchProprietes();
    } catch (error) {
      console.error('Erreur lors de l\'envoi', error);
    }
  };

  const handleEdit = prop => {
    setFormData({ 
      titre: prop.titre || '',
      description: prop.description || '',
      prix: prop.prix || '',
      surface: prop.surface || '',
      localisation: prop.localisation || '',
      statut: prop.statut || '',
      type: prop.type || '',
      pieces: prop.pieces || '',
      images: [] // On ne préremplit pas les fichiers, il faut recharger si besoin
    });
    if(fileInputRef.current) {
      fileInputRef.current.value = null; // Reset input file à la modification
    }
    setEditingId(prop.id);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:8000/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProprietes();
    } catch (error) {
      console.error('Erreur suppression', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>{editingId ? 'Modifier Propriété' : 'Ajouter une Propriété'}</h3>
      <form onSubmit={handleSubmit} className="mb-4" encType="multipart/form-data">
        {/* Tous tes inputs */}
        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input type="text" name="titre" className="form-control" value={formData.titre} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Prix</label>
          <input type="number" name="prix" className="form-control" value={formData.prix} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Surface (m²)</label>
          <input type="number" name="surface" className="form-control" value={formData.surface} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Localisation</label>
          <input type="text" name="localisation" className="form-control" value={formData.localisation} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Statut</label>
          <input type="text" name="statut" className="form-control" value={formData.statut} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <select name="type" className="form-select" value={formData.type} onChange={handleChange} required>
            <option value="">-- Sélectionnez --</option>
            <option value="vente">Vente</option>
            <option value="location">Location</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre de pièces</label>
          <input type="number" name="pieces" className="form-control" value={formData.pieces} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Images</label>
          <input
            type="file"
            name="images"
            className="form-control"
            onChange={handleFileChange}
            multiple
            ref={fileInputRef}
          />
        </div>

        <button type="submit" className="btn btn-success">
          {editingId ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>

      <h4>Liste des propriétés</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Type</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {proprietes.map(prop => (
            <tr key={prop.id}>
              <td>{prop.titre}</td>
              <td>{prop.type}</td>
              <td>{prop.prix} FCFA</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(prop)}>Modifier</button>
                <button className="btn btn-danger" onClick={() => handleDelete(prop.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
