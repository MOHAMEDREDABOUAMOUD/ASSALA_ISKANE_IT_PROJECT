package com.assalaIskane.project.models;

public class Projet {
	private String id;
	private String nom;
	private User resp;
	
	public Projet(String id, String nom, User resp) {
		super();
		this.id = id;
		this.nom = nom;
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

	public User getResp() {
		return resp;
	}

	public void setResp(User resp) {
		this.resp = resp;
	}

	@Override
	public String toString() {
		return "Projet [id=" + id + ", nom=" + nom + ", resp=" + resp + "]";
	}
}
