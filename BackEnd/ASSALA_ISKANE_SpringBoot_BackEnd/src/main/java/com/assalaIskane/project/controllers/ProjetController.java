package com.assalaIskane.project.controllers;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.print.attribute.standard.Severity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.assalaIskane.project.business.ProjetServiceInterface;
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

@RestController
public class ProjetController {
	@Autowired
	private ProjetServiceInterface service;
	
	@PostMapping("/CreateProjet")
	void createProjet(@RequestParam String id, @RequestParam String nom, @RequestParam String numero_marche, @RequestParam String objet, @RequestParam String date_ordre, @RequestParam String date_fin, @RequestParam String delai, @RequestParam String id_resp, @RequestParam String id_resp_chantier) throws ParseException {
		service.createProjet(id, nom, numero_marche, objet, new SimpleDateFormat("yyyy-MM-dd").parse(date_ordre), new SimpleDateFormat("yyyy-MM-dd").parse(date_fin), delai, id_resp, id_resp_chantier);
	}
	@PostMapping("/AddAbsence")
	void AddAbsence(@RequestParam String id_ouvrier, @RequestParam String date_absence, @RequestParam int id_chantier, @RequestParam int absent) throws ParseException {
		service.AddAbsence(id_ouvrier, new SimpleDateFormat("yyyy-MM-dd").parse(date_absence), id_chantier, absent);
	}
	@PostMapping("/AddFichier")
    public String handleFileUpload(@RequestParam("nom") String nom, @RequestParam("fichier") MultipartFile fichier, @RequestParam("id_projet") String id_projet) {
        try {
            byte[] fileContent = fichier.getBytes();
            service.addFichier(nom, fileContent, id_projet);
            return "File uploaded successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "File upload failed!";
        }
    }
	@PostMapping("/RemoveFichier")
    public String removeFile(@RequestParam("id") int id) throws IOException {
        service.removeFichier(id);
		return "File deleted successfully!";
    }
	@GetMapping("/getFichiersProjet")
	List<Fichier_projet> getFichiersProjet(@RequestParam String id_projet) {
		return service.getFichiersProjet(id_projet);
	}
	@GetMapping("/getProjets")
	List<Projet> getProjets(@RequestParam String id_resp) {
		return service.getProjets(id_resp);
	}
	@GetMapping("/getProjet")
	List<Projet> getProjet(@RequestParam String id_resp) {
		return service.getProjet(id_resp);
	}
	@GetMapping("/getChantier")
	Chantier getChantier(@RequestParam String id_projet) {
		return service.getChantier(id_projet);
	}
	@GetMapping("/getAllProjets")
	List<Projet> getAllProjets() {
		return service.getProjets();
	}
	@GetMapping("/getMaterielsChantiers")
	List<Materiel_chantier> getMaterielsChantiers(@RequestParam String id_projet) {
		System.out.println("els : "+service.getMaterielsChantiers(id_projet).size()+" : "+service.getMaterielsChantiers(id_projet).get(0));
		return service.getMaterielsChantiers(id_projet);
	}
	@GetMapping("/getMateriauxChantiers")
	List<Materiaux_chantier> getMateriauxChantiers(@RequestParam String id_projet) {
		System.out.println("aux : "+service.getMateriauxChantiers(id_projet).size()+" : "+service.getMateriauxChantiers(id_projet).get(0));
		return service.getMateriauxChantiers(id_projet);
	}
	@PostMapping("/AddBesoin")
	void addBesoin(@RequestParam String nom, @RequestParam String date_demande, @RequestParam String qte, @RequestParam String valide_par, @RequestParam String id_projet) throws ParseException {
		service.addBesoin(nom, new SimpleDateFormat("yyyy-MM-dd").parse(date_demande), qte, valide_par, id_projet);
	}
	@GetMapping("/getBesoins")
	List<Besoin> getBesoins(@RequestParam String id_resp, @RequestParam String id_projet){
		return service.getBesoins(id_resp, id_projet);
	}
	@GetMapping("/getBesoinsCC")
	List<Besoin> getBesoinsCC(@RequestParam String id_projet){
		return service.getBesoinsCC(id_projet);
	}
	@GetMapping("/getBesoinsRP")
	List<Besoin> getBesoinsRP(@RequestParam String id_projet){
		return service.getBesoinsRP(id_projet);
	}
	@GetMapping("/getBesoinsRT")
	List<Besoin> getBesoinsRT(@RequestParam String id_projet){
		return service.getBesoinsRT(id_projet);
	}
	@GetMapping("/getBesoinsST")
	List<Besoin> getBesoinsST(@RequestParam String id_projet){
		return service.getBesoinsST(id_projet);
	}
	@GetMapping("/getBesoinsRC")
	List<Besoin> getBesoinsRC(@RequestParam String id_projet){
		return service.getBesoinsRC(id_projet);
	}
	@GetMapping("/getBesoinsRM")
	List<Besoin> getBesoinsRM(@RequestParam String id_projet){
		return service.getBesoinsRM(id_projet);
	}
	@GetMapping("/getAbsences")
	List<Absence> getAbsences(@RequestParam String id_projet, @RequestParam String date_debut, @RequestParam String date_fin) throws ParseException{
		for (Absence a : service.getAbsences(id_projet, new SimpleDateFormat("yyyy-MM-dd").parse(date_debut), new SimpleDateFormat("yyyy-MM-dd").parse(date_fin))) {
			System.out.println(a);
		}
		return service.getAbsences(id_projet, new SimpleDateFormat("yyyy-MM-dd").parse(date_debut), new SimpleDateFormat("yyyy-MM-dd").parse(date_fin));
	}
	@PostMapping("/validateBesoin")
	void validateBesoin(@RequestParam String id_resp, @RequestParam String id_besoin){
		service.validateBesoin(id_resp, id_besoin);
	}
	@PostMapping("/deleteBesoin")
	void deleteBesoin(@RequestParam String id_besoin){
		service.deleteBesoin(id_besoin);
	}
	@GetMapping("/getCC")
	List<User> getCC(){
		return service.getCC();
	}
	@GetMapping("/getRP")
	List<User> getRP(){
		return service.getRP();
	}
	@PostMapping("/addMateriel")
	void addMateriel(@RequestParam String nom, @RequestParam String qte, @RequestParam String prix, @RequestParam String idProjet) {
	    service.addMaterielToChantier(nom, qte, prix, idProjet);
	}
	@PostMapping("/addMateriaux")
	void addMateriaux(@RequestParam String nom, @RequestParam String type, @RequestParam String qte, @RequestParam String prix, @RequestParam String idProjet) {
	    service.addMateriauxToChantier(nom, type, qte, prix, idProjet);
	}
	@PostMapping("/updateMateriaux")
	void updateMateriaux(@RequestParam String id, @RequestParam String qte) {
	    service.updateMateriaux(id, qte);
	}
	@PostMapping("/updateMateriel")
	void updateMateriel(@RequestParam String id, @RequestParam String qte) {
	    service.updateMateriel(id, qte);
	}
	@PostMapping("/deleteMateriel")
	void deleteMateriel(@RequestParam String id) {
	    service.deleteMateriel(id);
	}
	@PostMapping("/deleteMateriau")
	void deleteMateriau(@RequestParam String id) {
	    service.deleteMateriau(id);
	}
}
