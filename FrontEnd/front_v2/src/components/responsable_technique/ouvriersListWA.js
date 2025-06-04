import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import logo from '../../images/logo00.png';
import { getUSERID } from '../constants';

const OuvriersAbsencesRT = () => {
    const { idProjet } = useParams();
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [absences, setAbsences] = useState([]);
    const [daysInterval, setDaysInterval] = useState([]);
    const [error, setError] = useState('');

    const handleValidateAbsences = async () => {
        try {
            // Parcourir toutes les absences
            for (let i = 0; i < absences.length; i++) {
                const absence = absences[i];
                // Appel à l'API pour valider l'absence
                const response = await api.post(`/ValiderAbsence?id=${absence.id}&valide_par=${getUSERID()}`);
    
                if (response.status === 200) {
                    // Mettre à jour l'état de l'application après la validation
                    // setAbsences(prevAbsences => prevAbsences.map(abs => 
                    //     abs.id === absence.id ? { ...abs, valide: true } : abs
                    // ));
                    //
                } else {
                    setError('Une erreur est survenue lors de la validation des absences.');
                    return;
                }
            }
            alert('Les absences ont été validées avec succès.');
            setError('');
        } catch (err) {
            console.error('Erreur lors de la validation des absences :', err);
            setError('Une erreur est survenue lors de la validation des absences.');
        }
    };

    const generateDateRange = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            dates.push(new Date(currentDate).toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const fetchAbsences = async () => {
        if (!dateStart || !dateEnd) {
            setError('Veuillez saisir les deux dates.');
            return;
        }

        if (new Date(dateStart) > new Date(dateEnd)) {
            setError('La date de début doit être antérieure ou égale à la date de fin.');
            return;
        }

        try {
            setError('');
            const response = await api.get(`/getAbsences?id_projet=${idProjet}&date_debut=${dateStart}&date_fin=${dateEnd}`);
            if (response.status === 200 && response.data.length > 0) {
                setAbsences(response.data);
                setDaysInterval(generateDateRange(dateStart, dateEnd));
            } else {
                setAbsences([]);
                setDaysInterval([]);
                setError('Aucune donnée trouvée pour cet intervalle.');
            }
        } catch (err) {
            console.error('Erreur lors de la récupération des données :', err);
            setError('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    // Fonction pour vérifier si un ouvrier est absent à une date donnée
    const isAbsentOnDate = (workerAbsences, date) => {
        if (!workerAbsences || !Array.isArray(workerAbsences)) {
            return null; // Si aucune absence enregistrée, retourner null
        }
    
        // Convertir la date en format local
        const localDate = new Date(date).toLocaleDateString();
    
        // Chercher si une absence correspond à cette date
        const absence = workerAbsences.find(absence => {
            const absenceDate = new Date(absence.date_absence).toLocaleDateString();
            return absenceDate === localDate;
        });
    
        if (!absence) {
            return null; // Si aucune absence pour cette date, retourner null
        }
    
        // Vérifier le champ 'absent'. Si égal à 1, l'ouvrier est absent (retourner false)
        if (absence.absent === 1) {
            return false; // Absent
        } else if (absence.absent === 0) {
            return true; // Présent
        }
    
        return null; // Si aucune valeur valide dans 'absent', retourner null
    };    

    const groupAbsencesByWorker = (absences) => {
        const grouped = {};
        absences.forEach(absence => {
            const workerId = absence.ouvrier.id;
            if (!grouped[workerId]) {
                grouped[workerId] = {
                    ...absence.ouvrier,
                    absences: []
                };
            }
            grouped[workerId].absences.push(absence);
        });
        return Object.values(grouped);
    };

    // Grouper les absences avant de rendre
    const groupedAbsences = groupAbsencesByWorker(absences);

    return (
        <div className="main-layout">
            <nav className="navbar">
                <div className="navbar-logo">
                    <a href="/">
                        <img src={logo} alt="Logo" className="navbar-logo-image" />
                    </a>
                </div>
                <ul className="navbar-menu">
                    <li>
                        <a href="/">Se déconnecter</a>
                    </li>
                </ul>
            </nav>

            <div className="content">
                {/* Menu latéral gauche */}
                <aside className="sidebar">
                <ul className="sidebar-menu">
                    <li><a href={"/absencesRT/"+idProjet}>liste des employés</a></li>
                    <li><a href={"/materialsRT/"+idProjet}>liste des materials</a></li>
                    <li><a href={"/filesRT/"+idProjet}>liste des fichiers</a></li>
                    <li><a href={`/needsRT/${idProjet}`}>Liste des besoins</a></li>
                    <li>
                        <a href={`/homeRT`}>Liste des projets</a>
                    </li>
                </ul>
                </aside>
                <div className="absences-container">
                    <h2 className="absences-title">Gestion des Absences</h2>
                    <div className="date-filters">
                        <input
                            type="date"
                            value={dateStart}
                            onChange={(e) => setDateStart(e.target.value)}
                        />
                        <input
                            type="date"
                            value={dateEnd}
                            onChange={(e) => setDateEnd(e.target.value)}
                        />
                        <button onClick={fetchAbsences}>Rechercher</button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {absences.length > 0 ? (
                        <table className="absences-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    {daysInterval.map((date, index) => (
                                        <th key={index}>{new Date(date).toLocaleDateString()}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {groupedAbsences.map((worker) => (
                                    <tr key={worker.id}>
                                        <td>{worker.id}</td>
                                        <td>{worker.nom}</td>
                                        <td>{worker.prenom}</td>
                                        {daysInterval.map((date, index) => {
                                            const absenceStatus = isAbsentOnDate(worker.absences, date);
                                            return (
                                                <td key={index}>
                                                    {absenceStatus === null ? '' : absenceStatus ? 'Présent' : 'Absent'}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        !error && <p>Aucune absence trouvée.</p>
                    )}
                    <button onClick={handleValidateAbsences}>Valider les absences</button>
                </div>
            </div>
        </div>
    );
};

export default OuvriersAbsencesRT;
