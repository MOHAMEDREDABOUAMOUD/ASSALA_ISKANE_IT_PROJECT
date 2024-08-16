import React, { useState } from 'react';
import './DailyReports.css';

export default function DailyReports() {
  const [reports, setReports] = useState([
    {
      id: 1,
      ficheNumber: 29,
      date: '2024-07-22',
      weather: {
        temperature: 'Élevée',
        rain: 'Non',
        wind: 'Pas de vent',
      },
      tasks: [
        'Mise en place du ferraillage et coffrage des deux massifs',
        'Bétonnage des poteaux du premier étage',
        'Traçage des zones de cloisons du RDC',
      ],
      remarks: 'À ce jour, les travaux de bétonnage des poteaux du premier étage ont été achevés avec succès.',
    },
    // Other reports...
  ]);

  const [newReport, setNewReport] = useState({
    ficheNumber: '',
    date: '',
    weather: {
      temperature: '',
      rain: '',
      wind: '',
    },
    tasks: [],
    remarks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReport.ficheNumber && newReport.date) {
      setReports([
        ...reports,
        {
          ...newReport,
          id: reports.length + 1,
        },
      ]);
      setNewReport({
        ficheNumber: '',
        date: '',
        weather: {
          temperature: '',
          rain: '',
          wind: '',
        },
        tasks: [],
        remarks: '',
      });
    } else {
      alert('Veuillez remplir tous les champs requis');
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <form className="report-form" onSubmit={handleSubmit}>
          <h2>Ajouter un Rapport Quotidien</h2>
          <input
            type="text"
            name="ficheNumber"
            placeholder="Numéro de Fiche"
            value={newReport.ficheNumber}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={newReport.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="temperature"
            placeholder="Température"
            value={newReport.weather.temperature}
            onChange={(e) =>
              setNewReport((prevReport) => ({
                ...prevReport,
                weather: { ...prevReport.weather, temperature: e.target.value },
              }))
            }
          />
          <input
            type="text"
            name="rain"
            placeholder="Pluie"
            value={newReport.weather.rain}
            onChange={(e) =>
              setNewReport((prevReport) => ({
                ...prevReport,
                weather: { ...prevReport.weather, rain: e.target.value },
              }))
            }
          />
          <input
            type="text"
            name="wind"
            placeholder="Vent"
            value={newReport.weather.wind}
            onChange={(e) =>
              setNewReport((prevReport) => ({
                ...prevReport,
                weather: { ...prevReport.weather, wind: e.target.value },
              }))
            }
          />
          <textarea
            name="remarks"
            placeholder="Remarques"
            value={newReport.remarks}
            onChange={handleChange}
          />
          <button type="submit">Ajouter Rapport</button>
        </form>

        <div className="reports-list">
          {reports.map((report) => (
            <div className="report-card" key={report.id}>
              <h3>Fiche N° {report.ficheNumber}</h3>
              <p>Date: {report.date}</p>
              <p>Température: {report.weather.temperature}</p>
              <p>Pluie: {report.weather.rain}</p>
              <p>Vent: {report.weather.wind}</p>
              <div>
                <h4>Travaux Réalisés</h4>
                {report.tasks.map((task, index) => (
                  <p key={index}>{task}</p>
                ))}
              </div>
              <p><strong>Remarques:</strong> {report.remarks}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
