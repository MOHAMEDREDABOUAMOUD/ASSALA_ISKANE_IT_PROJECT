package com.assalaIskane.project.business;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.assalaIskane.project.models.Absence;
import com.assalaIskane.project.models.Besoin;
import com.assalaIskane.project.models.Chantier;
import com.assalaIskane.project.models.Fichier_projet;
import com.assalaIskane.project.models.Materiaux;
import com.assalaIskane.project.models.Materiaux_chantier;
import com.assalaIskane.project.models.Materiel;
import com.assalaIskane.project.models.Materiel_chantier;
import com.assalaIskane.project.models.Projet;
import com.assalaIskane.project.repositories.ProjetRepository;

@Service
public class ProjetService implements ProjetServiceInterface{
	private ProjetRepository projetDao;
	
	public ProjetService(ProjetRepository projetDao) {
		this.projetDao = projetDao;
	}

	@Override
	public void createProjet(String id, String nom, String numero_marche, String objet, Date date_ordre, Date date_fin,
			int delai, String id_resp, String id_resp_chantier) {
		projetDao.insertProjet(id, nom, numero_marche, objet, date_ordre, date_fin, delai, id_resp);
		projetDao.insertChantier(id, id_resp_chantier);
	}

	@Override
	public void AddAbsence(String id_ouvrier, Date date_absence, int id_chantier, int absent) {
		projetDao.addAbsence(id_ouvrier, date_absence, id_chantier, absent);
	}

	@Override
	public void addFichier(String nom, byte[] fichier, String id_projet) {
		projetDao.addFichier(nom, fichier, id_projet);
	}
	
	@Override
	public void removeFichier(int id) {
		projetDao.removeFichier(id);
	}

	@Override
	public List<Fichier_projet> getFichiersProjet(String id_projet) {
		return projetDao.getFichiersProjet(id_projet);
	}

	@Override
	public List<Projet> getProjets(String id_resp) {
		return projetDao.getProjets(id_resp);
	}

	@Override
	public List<Projet> getProjets() {
		return projetDao.getProjets();
	}

	@Override
	public List<Materiel> getMaterielsChantiers(String id_projet) {
		return projetDao.getMaterielsChantiers(id_projet);
	}

	@Override
	public List<Materiaux> getMateriauxChantiers(String id_projet) {
		return projetDao.getMateriauxChantiers(id_projet);
	}

	@Override
	public void addBesoin(String nom, Date date_demande, String qte, String valide_par, String id_projet) {
		Chantier c = projetDao.getChantier(id_projet);
		projetDao.addBesoin(nom, date_demande, qte, valide_par, c.getId());
	}

	@Override
	public List<Besoin> getBesoins(String id_resp, String id_projet) {
		return projetDao.getBesoins(id_resp, id_projet);
	}

	@Override
	public List<Absence> getAbsences(String id_projet, Date date_debut, Date date_fin) {
		return projetDao.getAbsences(id_projet, date_debut, date_fin);
	}

	@Override
	public List<Besoin> getBesoinsCC(String id_projet) {
		return projetDao.getBesoinsCC(id_projet);
	}

	@Override
	public List<Besoin> getBesoinsRP(String id_projet) {
		return projetDao.getBesoinsRP(id_projet);
	}

	@Override
	public List<Besoin> getBesoinsRT(String id_projet) {
		return projetDao.getBesoinsRT(id_projet);
	}

	@Override
	public List<Besoin> getBesoinsST(String id_projet) {
		return projetDao.getBesoinsST(id_projet);
	}
	
	@Override
	public Chantier getChantier(String id_projet) {
		return projetDao.getChantier(id_projet);
	}

	@Override
	public void validateBesoin(String id_resp, String id_besoin) {
		projetDao.validateBesoins(id_resp, id_besoin);
	}

}
