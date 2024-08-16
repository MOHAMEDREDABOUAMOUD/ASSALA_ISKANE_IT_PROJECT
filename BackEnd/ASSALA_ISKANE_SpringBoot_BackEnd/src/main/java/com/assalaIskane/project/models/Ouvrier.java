package com.assalaIskane.project.models;

public class Ouvrier {
	private String id;
	private String nom;
	private String prenom;
	private String numero;
	public Ouvrier(String id, String nom, String prenom, String numero) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
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
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	@Override
	public String toString() {
		return "Ouvrier [id=" + id + ", nom=" + nom + ", prenom=" + prenom + ", numero=" + numero + "]";
	}
	
}
