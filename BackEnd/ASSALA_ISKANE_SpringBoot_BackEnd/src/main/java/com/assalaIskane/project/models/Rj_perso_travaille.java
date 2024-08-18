package com.assalaIskane.project.models;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Rj_perso_travaille {
	@ManyToOne
	@JoinColumn(name = "id_rj")
	private Rapport_jour rj;
	private String type;
	@ManyToOne
	@JoinColumn(name = "id_ouvrier")
	private Ouvrier ouvrier;
	public Rj_perso_travaille(Rapport_jour rj, String type, Ouvrier ouvrier) {
		super();
		this.rj = rj;
		this.type = type;
		this.ouvrier = ouvrier;
	}
	public Rapport_jour getRj() {
		return rj;
	}
	public void setRj(Rapport_jour rj) {
		this.rj = rj;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Ouvrier getOuvrier() {
		return ouvrier;
	}
	public void setOuvrier(Ouvrier ouvrier) {
		this.ouvrier = ouvrier;
	}
	@Override
	public String toString() {
		return "Rj_perso_travaille [rj=" + rj + ", type=" + type + ", ouvrier=" + ouvrier + "]";
	}
	
}
