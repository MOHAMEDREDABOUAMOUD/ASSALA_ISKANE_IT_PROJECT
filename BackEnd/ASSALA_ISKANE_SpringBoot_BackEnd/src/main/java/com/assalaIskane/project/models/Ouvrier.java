package com.assalaIskane.project.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Ouvrier {
	@Id
	private String id;
	private String nom;
	private String prenom;
	private String numero;
	@ManyToOne
	@JoinColumn(name = "id_projet")
	private Projet projet;
	
	public Ouvrier() {
		// TODO Auto-generated constructor stub
	}
	public Ouvrier(String id, String nom, String prenom, String numero, Projet projet) {
		super();
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.numero = numero;
		this.projet = projet;
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
	public Projet getProjet() {
		return projet;
	}
	public void setProjet(Projet projet) {
		this.projet = projet;
	}
	@Override
	public String toString() {
		return "Ouvrier [id=" + id + ", nom=" + nom + ", prenom=" + prenom + ", numero=" + numero + ", projet=" + projet
				+ "]";
	}
	
}
