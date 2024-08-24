package com.assalaIskane.project.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Materiel_chantier {
	@Id
	private int id;
	@ManyToOne
	@JoinColumn(name = "id_materiel")
	private Materiel materiel;
	@ManyToOne
	@JoinColumn(name = "id_chantier")
	private Chantier chantier;
	private int qte;
	
	public Materiel_chantier() {
		// TODO Auto-generated constructor stub
	}
	public Materiel_chantier(Materiel materiel, Chantier chantier, int qte) {
		super();
		this.materiel = materiel;
		this.chantier = chantier;
		this.qte = qte;
	}

	public Materiel getMateriel() {
		return materiel;
	}

	public void setMateriel(Materiel materiel) {
		this.materiel = materiel;
	}

	public Chantier getChantier() {
		return chantier;
	}

	public void setChantier(Chantier chantier) {
		this.chantier = chantier;
	}

	public int getQte() {
		return qte;
	}

	public void setQte(int qte) {
		this.qte = qte;
	}

	@Override
	public String toString() {
		return "Materiel_chantier [materiel=" + materiel + ", chantier=" + chantier + ", qte=" + qte + "]";
	}

}
