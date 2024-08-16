import React, { useState } from 'react';

export default function AjouterOuvrier() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numero, setNumero] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOuvrier = {
      nom,
      prenom,
      numero,
    };

    try {
      const response = await fetch('http://localhost:5000/api/ouvrier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOuvrier),
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
        // Clear the form
        setNom('');
        setPrenom('');
        setNumero('');
      } else {
        throw new Error('Failed to add ouvrier');
      }
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Ajouter un Ouvrier</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Numéro:</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
        {success && <p>Ouvrier ajouté avec succès!</p>}
        {error && <p>Erreur: {error}</p>}
      </form>
    </div>
  );
}
