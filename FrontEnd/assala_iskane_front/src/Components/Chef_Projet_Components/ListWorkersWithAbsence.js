import React from 'react';
import './ListProjects.css';  // Ensure Tailwind CSS is imported here

// Local list of projects
const projects = [
  { id: 'PROJ001', nom: 'Projet Casablanca', id_resp: 'USR001' },
  { id: 'PROJ002', nom: 'Projet Marrakech', id_resp: 'USR002' },
  { id: 'PROJ003', nom: 'Projet Fes', id_resp: 'USR003' },
  // Add more projects as needed
];

// Local list of users (for example purposes)
const users = [
  { id: 'USR001', nom: 'El Ayoubi', prenom: 'Khalid' },
  { id: 'USR002', nom: 'Benjelloun', prenom: 'Ahmed' },
  { id: 'USR003', nom: 'Bouhssine', prenom: 'Fatima' },
  // Add more users as needed
];

export default function ListProjects() {
  // Find the project manager names based on the project manager ID
  const getProjectManagerName = (id) => {
    const user = users.find(user => user.id === id);
    return user ? `${user.prenom} ${user.nom}` : 'Inconnu';
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Liste des Projets</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du Projet</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map(project => (
              <tr key={project.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getProjectManagerName(project.id_resp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
