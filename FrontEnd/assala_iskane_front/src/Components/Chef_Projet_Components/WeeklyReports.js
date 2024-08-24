import React, { useState } from 'react';
import './WeeklyReports.css';

export default function WeeklyReports() {
  const [weeklyReports, setWeeklyReports] = useState([
    {
      id: 1,
      reportNumber: 12,
      startDate: '2024-07-01',
      endDate: '2024-07-07',
      progressSummary: 'Achèvement des travaux de coffrage et ferraillage des poteaux.',
      tasks: [
        'Coffrage des poteaux pour le premier étage.',
        'Ferraillage des poutres principales.',
        'Préparation pour le bétonnage de la dalle du premier étage.',
      ],
      remarks: 'Les travaux sont dans les délais avec un avancement de 80%.',
    },
    // Other reports...
  ]);

  const [newWeeklyReport, setNewWeeklyReport] = useState({
    reportNumber: '',
    startDate: '',
    endDate: '',
    progressSummary: '',
    tasks: [],
    remarks: '',
  });

  const handleWeeklyReportChange = (e) => {
    const { name, value } = e.target;
    setNewWeeklyReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const handleWeeklyReportSubmit = (e) => {
    e.preventDefault();
    if (newWeeklyReport.reportNumber && newWeeklyReport.startDate && newWeeklyReport.endDate) {
      setWeeklyReports([
        ...weeklyReports,
        {
          ...newWeeklyReport,
          id: weeklyReports.length + 1,
        },
      ]);
      setNewWeeklyReport({
        reportNumber: '',
        startDate: '',
        endDate: '',
        progressSummary: '',
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
        <form className="weekly-report-form" onSubmit={handleWeeklyReportSubmit}>
          <h2>Ajouter un Rapport Hebdomadaire</h2>
          <input
            type="text"
            name="reportNumber"
            placeholder="Numéro du Rapport"
            value={newWeeklyReport.reportNumber}
            onChange={handleWeeklyReportChange}
          />
          <input
            type="date"
            name="startDate"
            value={newWeeklyReport.startDate}
            onChange={handleWeeklyReportChange}
          />
          <input
            type="date"
            name="endDate"
            value={newWeeklyReport.endDate}
            onChange={handleWeeklyReportChange}
          />
          <textarea
            name="progressSummary"
            placeholder="Résumé de l'avancement"
            value={newWeeklyReport.progressSummary}
            onChange={handleWeeklyReportChange}
          />
          <textarea
            name="remarks"
            placeholder="Remarques"
            value={newWeeklyReport.remarks}
            onChange={handleWeeklyReportChange}
          />
          <button type="submit">Ajouter Rapport Hebdomadaire</button>
        </form>

        <div className="weekly-reports-list">
          {weeklyReports.map((report) => (
            <div className="weekly-report-card" key={report.id}>
              <h3>Rapport N° {report.reportNumber}</h3>
              <p>Du: {report.startDate} Au: {report.endDate}</p>
              <p><strong>Résumé de l'avancement:</strong> {report.progressSummary}</p>
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
