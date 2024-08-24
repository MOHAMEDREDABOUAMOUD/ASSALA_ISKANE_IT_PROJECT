package com.assalaIskane.project.models;

import java.util.Base64;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Fichier_projet {
	@Id
	private int id;
	private byte[] fichier;
	@ManyToOne
	@JoinColumn(name = "id_projet")
	private Projet projet;
	
	public Fichier_projet() {
		// TODO Auto-generated constructor stub
	}
	public Fichier_projet(int id, byte[] fichier, Projet projet) {
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

	@Override
	public String toString() {
		return "Fichier_projet [id=" + id + ", fichier=" + fichier + ", projet=" + projet + "]";
	}

}
