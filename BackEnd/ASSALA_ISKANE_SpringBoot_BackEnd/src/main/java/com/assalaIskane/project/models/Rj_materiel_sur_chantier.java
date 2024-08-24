package com.assalaIskane.project.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Rj_materiel_sur_chantier {
	@Id
	private int id;
	@ManyToOne
	@JoinColumn(name = "id_rj")
	private Rapport_jour rj;
	private String materiel;
	private int qte;
	private String etat;
	private String type;
	
	public Rj_materiel_sur_chantier() {
		// TODO Auto-generated constructor stub
	}
	public Rj_materiel_sur_chantier(Rapport_jour rj, String materiel, int qte, String etat, String type) {
		super();
		this.rj = rj;
		this.materiel = materiel;
		this.qte = qte;
		this.etat = etat;
		this.type = type;
	}
	public Rapport_jour getRj() {
		return rj;
	}
	public void setRj(Rapport_jour rj) {
		this.rj = rj;
	}
	public String getMateriel() {
		return materiel;
	}
	public void setMateriel(String materiel) {
		this.materiel = materiel;
	}
	public int getQte() {
		return qte;
	}
	public void setQte(int qte) {
		this.qte = qte;
	}
	public String getEtat() {
		return etat;
	}
	public void setEtat(String etat) {
		this.etat = etat;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@Override
	public String toString() {
		return "Rj_materiel_sur_chantier [rj=" + rj + ", materiel=" + materiel + ", qte=" + qte + ", etat=" + etat
				+ ", type=" + type + "]";
	}
	
}
