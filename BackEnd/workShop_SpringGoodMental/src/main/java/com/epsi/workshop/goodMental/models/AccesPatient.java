package com.epsi.workshop.goodMental.models;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "Acces_Patient")
public class AccesPatient {
    @EmbeddedId
    private AccesPatientId id;

    @ManyToOne
    @MapsId("adminId")
    @JoinColumn(name = "admin_id")
    private CompteAdmin admin;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private CompteUtilisateur utilisateur;
    
    public AccesPatient() {
    	// TODO Auto-generated constructor stub
    }
	public AccesPatient(AccesPatientId id, CompteAdmin admin, CompteUtilisateur utilisateur) {
		super();
		this.id = id;
		this.admin = admin;
		this.utilisateur = utilisateur;
	}

	public AccesPatientId getId() {
		return id;
	}

	public void setId(AccesPatientId id) {
		this.id = id;
	}

	public CompteAdmin getAdmin() {
		return admin;
	}

	public void setAdmin(CompteAdmin admin) {
		this.admin = admin;
	}

	public CompteUtilisateur getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(CompteUtilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}

	@Override
	public String toString() {
		return "AccesPatient [id=" + id + ", admin=" + admin + ", utilisateur=" + utilisateur + "]";
	}

    
}