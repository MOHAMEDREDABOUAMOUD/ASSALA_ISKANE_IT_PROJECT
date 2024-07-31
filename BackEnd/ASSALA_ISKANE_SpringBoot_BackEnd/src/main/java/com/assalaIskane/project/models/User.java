package com.assalaIskane.project.models;

public class User {
	private String id;
	private String nom;
	private String prenom;
	private Roles fonction;
	private String numero;
	
	public User(String id, String nom, String prenom, Roles fonction, String numero) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.fonction = fonction;
		this.numero = numero;
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

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public Roles getFonction() {
		return fonction;
	}

	public void setFonction(Roles fonction) {
		this.fonction = fonction;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", nom=" + nom + ", prenom=" + prenom + ", fonction=" + fonction + ", numero="
				+ numero + "]";
	}
	
}
