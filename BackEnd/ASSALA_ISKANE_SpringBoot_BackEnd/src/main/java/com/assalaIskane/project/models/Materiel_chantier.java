package com.assalaIskane.project.models;

public class Materiel_chantier {
	private Materiel materiel;
	private Chantier chantier;
	private int qte;
	
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
