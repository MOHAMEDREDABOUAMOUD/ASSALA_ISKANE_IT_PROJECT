package com.assalaIskane.project.business;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import org.springframework.data.repository.query.Param;

import com.assalaIskane.project.models.Besoin;
import com.assalaIskane.project.models.Fichier_projet;
import com.assalaIskane.project.models.Materiaux_chantier;
import com.assalaIskane.project.models.Materiel_chantier;
import com.assalaIskane.project.models.Projet;

public interface ProjetServiceInterface {
	void createProjet(String id, String nom, String numero_marche, String objet, Date date_ordre, Date date_fin, int delai, String id_resp, String id_resp_chantier);
	void AddAbsence( String id_ouvrier, Date date_absence, int id_chantier, int absent);
	void addFichier(String nom, Base64 fichier, String id_projet);
	List<Fichier_projet> getFichiersProjet(String id_projet);
	List<Projet> getProjets(String id_resp);
	List<Projet> getProjets();
	List<Materiel_chantier> getMaterielsChantiers(String id_projet);
	List<Materiaux_chantier> getMateriauxChantiers(String id_projet);
	void addBesoin(String nom, Date date_demande, String qte, String valide_par, int id_chantier);
	List<Besoin> getBesoins(String id_resp, String id_projet);
}
