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
import com.assalaIskane.project.models.User;

public interface ProjetServiceInterface {
	void createProjet(String id, String nom, String numero_marche, String objet, Date date_ordre, Date date_fin, String delai, String id_resp, String id_resp_chantier);
	void AddAbsence( String id_ouvrier, Date date_absence, int id_chantier, int absent, String valide_par);
	void ValiderAbsence( int id, String valide_par);
	void addFichier(String nom, byte[] fichier, String id_projet);
	void removeFichier(int id);
	List<Fichier_projet> getFichiersProjet(String id_projet);
	List<Projet> getProjet(String id_resp);
	List<Projet> getProjets(String id_resp);
	List<Projet> getProjets();
	List<Materiel> getMateriels();
	List<Materiel_chantier> getMaterielsChantiers(String id_projet);
	List<Materiaux_chantier> getMateriauxChantiers(String id_projet);
	void addBesoin(String nom, Date date_demande, String qte, String valide_par, String id_projet);
	List<Besoin> getBesoins(String id_resp, String id_projet);
	List<Besoin> getBesoinsCC(String id_projet);
	List<Besoin> getBesoinsRP(String id_projet);
	List<Besoin> getBesoinsRT(String id_projet);
	List<Besoin> getBesoinsST(String id_projet);
	List<Besoin> getBesoinsRC(String id_projet);
	List<Besoin> getBesoinsRM(String id_projet);
	Chantier getChantier(String id_projet);
	void validateBesoin(String id_resp, String id_besoin);
	void deleteBesoin(String id_besoin);
	List<Absence> getAbsences(String id_projet, Date date_debut, Date date_fin);
	List<Absence> getAbsencesSC(String id_projet, Date date_debut, Date date_fin);
	List<User> getCC();
	List<User> getRP();
	public void addMaterielToChantier(int id_materiel, String qte, String idProjet);
	public void addMateriauxToChantier(String nom, String type, String qte, String prix, String idProjet);
	public void updateMateriaux(String id, String qte);
	public void updateMateriel(int id, String qte, String qte_stock);
	public void deleteMateriau(String id);
	public void deleteMateriel(int id, String qte);
	public void deleteMateriel(int id);
}
