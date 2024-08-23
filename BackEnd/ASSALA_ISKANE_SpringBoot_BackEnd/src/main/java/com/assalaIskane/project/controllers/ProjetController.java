package com.assalaIskane.project.controllers;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.print.attribute.standard.Severity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assalaIskane.project.business.ProjetServiceInterface;
import com.assalaIskane.project.models.Besoin;
import com.assalaIskane.project.models.Fichier_projet;
import com.assalaIskane.project.models.Materiaux_chantier;
import com.assalaIskane.project.models.Materiel_chantier;
import com.assalaIskane.project.models.Projet;

@RestController
public class ProjetController {
	@Autowired
	private ProjetServiceInterface service;
	
	@PostMapping("/CreateProjet")
	void createProjet(@RequestParam String id, @RequestParam String nom, @RequestParam String numero_marche, @RequestParam String objet, @RequestParam Date date_ordre, @RequestParam Date date_fin, @RequestParam int delai, @RequestParam String id_resp, @RequestParam String id_resp_chantier) {
		service.createProjet(id, nom, numero_marche, objet, date_ordre, date_fin, delai, id_resp, id_resp_chantier);
	}
	@PostMapping("/AddAbsence")
	void AddAbsence(@RequestParam String id_ouvrier, @RequestParam Date date_absence, @RequestParam int id_chantier, @RequestParam int absent) {
		service.AddAbsence(id_ouvrier, date_absence, id_chantier, absent);
	}
	@PostMapping("/AddFichier")
	void addFichier(@RequestParam String nom, @RequestParam Base64 fichier, @RequestParam String id_projet) {
		service.addFichier(nom, fichier, id_projet);
	}
	@GetMapping("/getFichiersProjet")
	List<Fichier_projet> getFichiersProjet(@RequestParam String id_projet) {
		return service.getFichiersProjet(id_projet);
	}
	@GetMapping("/getProjets")
	List<Projet> getProjets(@RequestParam String id_resp) {
		return service.getProjets(id_resp);
	}
	@GetMapping("/getProjets")
	List<Projet> getProjets() {
		return service.getProjets();
	}
	@GetMapping("/getMaterielsChantiers")
	List<Materiel_chantier> getMaterielsChantiers(@RequestParam String id_projet) {
		return service.getMaterielsChantiers(id_projet);
	}
	@GetMapping("/getMateriauxChantiers")
	List<Materiaux_chantier> getMateriauxChantiers(@RequestParam String id_projet) {
		return service.getMateriauxChantiers(id_projet);
	}
	@PostMapping("/AddBesoin")
	void addBesoin(@RequestParam String nom, @RequestParam Date date_demande, @RequestParam String qte, @RequestParam String valide_par, @RequestParam int id_chantier) {
		service.addBesoin(nom, date_demande, qte, valide_par, id_chantier);
	}
	@GetMapping("/getBesoins")
	List<Besoin> getBesoins(@RequestParam String id_resp, @RequestParam String id_projet){
		return service.getBesoins(id_resp, id_projet);
	}
}
