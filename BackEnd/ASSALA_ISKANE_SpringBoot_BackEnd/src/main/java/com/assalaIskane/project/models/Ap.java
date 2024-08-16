package com.assalaIskane.project.models;

import java.util.Date;

public class Ap {
	private Avancement_projet ap;
	private int no;
	private String nom;
	private int duree;
	private Date debut;
	private Date fin;
	private String etat;
	private String avancement;
	public Ap(Avancement_projet ap, int no, String nom, int duree, Date debut, Date fin, String etat,
			String avancement) {
		super();
		this.ap = ap;
		this.no = no;
		this.nom = nom;
		this.duree = duree;
		this.debut = debut;
		this.fin = fin;
		this.etat = etat;
		this.avancement = avancement;
	}
	public Avancement_projet getAp() {
		return ap;
	}
	public void setAp(Avancement_projet ap) {
		this.ap = ap;
	}
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public int getDuree() {
		return duree;
	}
	public void setDuree(int duree) {
		this.duree = duree;
	}
	public Date getDebut() {
		return debut;
	}
	public void setDebut(Date debut) {
		this.debut = debut;
	}
	public Date getFin() {
		return fin;
	}
	public void setFin(Date fin) {
		this.fin = fin;
	}
	public String getEtat() {
		return etat;
	}
	public void setEtat(String etat) {
		this.etat = etat;
	}
	public String getAvancement() {
		return avancement;
	}
	public void setAvancement(String avancement) {
		this.avancement = avancement;
	}
	@Override
	public String toString() {
		return "Ap [ap=" + ap + ", no=" + no + ", nom=" + nom + ", duree=" + duree + ", debut=" + debut + ", fin=" + fin
				+ ", etat=" + etat + ", avancement=" + avancement + "]";
	}
	
}
