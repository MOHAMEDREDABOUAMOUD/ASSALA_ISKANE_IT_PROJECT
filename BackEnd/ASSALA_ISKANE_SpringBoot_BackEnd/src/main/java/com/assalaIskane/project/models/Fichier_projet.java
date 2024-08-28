package com.assalaIskane.project.models;

import java.util.Arrays;
import java.util.Base64;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Fichier_projet {
	@Id
	private int id;
	private String nom;
	private byte[] fichier;
	@ManyToOne
	@JoinColumn(name = "id_projet")
	private Projet projet;
	
	public Fichier_projet() {
		// TODO Auto-generated constructor stub
	}
	public Fichier_projet(int id, String nom, byte[] fichier, Projet projet) {
		super();
		this.id = id;
		this.nom = nom;
		this.fichier = fichier;
		this.projet = projet;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public byte[] getFichier() {
		return fichier;
	}

	public void setFichier(byte[] fichier) {
		this.fichier = fichier;
	}

	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet projet) {
		this.projet = projet;
	}
	
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	@Override
	public String toString() {
		return "Fichier_projet [id=" + id + ", nom=" + nom + ", fichier=" + Arrays.toString(fichier) + ", projet="
				+ projet + "]";
	}
}
