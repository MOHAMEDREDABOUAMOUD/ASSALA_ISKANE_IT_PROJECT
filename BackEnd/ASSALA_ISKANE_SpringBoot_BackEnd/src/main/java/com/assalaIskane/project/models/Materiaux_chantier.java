package com.assalaIskane.project.models;

public class Materiaux_chantier {
	private Materiaux materiaux;
	private Chantier chantier;
	private int qte;
	
	public Materiaux_chantier(Materiaux materiaux, Chantier chantier, int qte) {
		super();
		this.materiaux = materiaux;
		this.chantier = chantier;
		this.qte = qte;
	}

	public Materiaux getMateriaux() {
		return materiaux;
	}

	public void setMateriaux(Materiaux materiaux) {
		this.materiaux = materiaux;
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
		return "Materiaux_chantier [materiaux=" + materiaux + ", chantier=" + chantier + ", qte=" + qte + "]";
	}
}
