package com.assalaIskane.project.models;

import java.util.Base64;

public class Fichier_projet {
	private int id;
	private Base64 fichier;
	private Projet projet;
	
	public Fichier_projet(int id, Base64 fichier, Projet projet) {
		super();
		this.id = id;
		this.fichier = fichier;
		this.projet = projet;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Base64 getFichier() {
		return fichier;
	}

	public void setFichier(Base64 fichier) {
		this.fichier = fichier;
	}

	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet projet) {
		this.projet = projet;
	}

	@Override
	public String toString() {
		return "Fichier_projet [id=" + id + ", fichier=" + fichier + ", projet=" + projet + "]";
	}

}
