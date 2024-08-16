package com.assalaIskane.project.models;

import java.util.Date;

public class Projet {
	private String id;
	private String nom;
	private String numero_marche;
	private String objet;
	private Date date_ordre;
	private Date date_fin;
	private int delai;
	private User resp;
	public Projet(String id, String nom, String numero_marche, String objet, Date date_ordre, Date date_fin, int delai,
			User resp) {
		super();
		this.id = id;
		this.nom = nom;
		this.numero_marche = numero_marche;
		this.objet = objet;
		this.date_ordre = date_ordre;
		this.date_fin = date_fin;
		this.delai = delai;
		this.resp = resp;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getNumero_marche() {
		return numero_marche;
	}
	public void setNumero_marche(String numero_marche) {
		this.numero_marche = numero_marche;
	}
	public String getObjet() {
		return objet;
	}
	public void setObjet(String objet) {
		this.objet = objet;
	}
	public Date getDate_ordre() {
		return date_ordre;
	}
	public void setDate_ordre(Date date_ordre) {
		this.date_ordre = date_ordre;
	}
	public Date getDate_fin() {
		return date_fin;
	}
	public void setDate_fin(Date date_fin) {
		this.date_fin = date_fin;
	}
	public int getDelai() {
		return delai;
	}
	public void setDelai(int delai) {
		this.delai = delai;
	}
	public User getResp() {
		return resp;
	}
	public void setResp(User resp) {
		this.resp = resp;
	}
	@Override
	public String toString() {
		return "Projet [id=" + id + ", nom=" + nom + ", numero_marche=" + numero_marche + ", objet=" + objet
				+ ", date_ordre=" + date_ordre + ", date_fin=" + date_fin + ", delai=" + delai + ", resp=" + resp + "]";
	}
	
}
