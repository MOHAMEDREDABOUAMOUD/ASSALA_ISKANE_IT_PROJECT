package com.assalaIskane.project.business;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.query.Param;

import com.assalaIskane.project.models.Absence;
import com.assalaIskane.project.models.Besoin;
import com.assalaIskane.project.models.Chantier;
import com.assalaIskane.project.models.Fichier_projet;
import com.assalaIskane.project.models.Materiaux;
import com.assalaIskane.project.models.Materiaux_chantier;
import com.assalaIskane.project.models.Materiel;
import com.assalaIskane.project.models.Materiel_chantier;
import com.assalaIskane.project.models.Projet;

public interface ProjetServiceInterface {
	void createProjet(String id, String nom, String numero_marche, String objet, Date date_ordre, Date date_fin, int delai, String id_resp, String id_resp_chantier);
	void AddAbsence( String id_ouvrier, Date date_absence, int id_chantier, int absent);
	void addFichier(String nom, byte[] fichier, String id_projet);
	void removeFichier(int id);
	List<Fichier_projet> getFichiersProjet(String id_projet);
	List<Projet> getProjets(String id_resp);
	List<Projet> getProjets();
	List<Materiel> getMaterielsChantiers(String id_projet);
	List<Materiaux> getMateriauxChantiers(String id_projet);
	void addBesoin(String nom, Date date_demande, String qte, String valide_par, String id_projet);
	List<Besoin> getBesoins(String id_resp, String id_projet);
	List<Besoin> getBesoinsCC(String id_projet);
	List<Besoin> getBesoinsRP(String id_projet);
	List<Besoin> getBesoinsRT(String id_projet);
	List<Besoin> getBesoinsST(String id_projet);
	Chantier getChantier(String id_projet);
	void validateBesoin(String id_resp, String id_besoin);
	List<Absence> getAbsences(String id_projet, Date date_debut, Date date_fin);
}
