package com.assalaIskane.project.models;

import java.util.Date;

public class Besoin {
	private int id;
	private String nom;
	private Date date_demande;
	private int qte;
	private User validé_par;
	private Chantier chantier;
	
	public Besoin(int id, String nom, Date date_demande, int qte, User validé_par, Chantier chantier) {
		super();
		this.id = id;
		this.nom = nom;
		this.date_demande = date_demande;
		this.qte = qte;
		this.validé_par = validé_par;
		this.chantier = chantier;
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public Date getDate_demande() {
		return date_demande;
	}

	public void setDate_demande(Date date_demande) {
		this.date_demande = date_demande;
	}

	public int getQte() {
		return qte;
	}

	public void setQte(int qte) {
		this.qte = qte;
	}

	public User getValidé_par() {
		return validé_par;
	}

	public void setValidé_par(User validé_par) {
		this.validé_par = validé_par;
	}

	public Chantier getChantier() {
		return chantier;
	}

	public void setChantier(Chantier chantier) {
		this.chantier = chantier;
	}
	@Override
	public String toString() {
		return "Besoin [id=" + id + ", nom=" + nom + ", date_demande=" + date_demande + ", qte=" + qte + ", validé_par="
				+ validé_par + ", chantier=" + chantier + "]";
	}
}
