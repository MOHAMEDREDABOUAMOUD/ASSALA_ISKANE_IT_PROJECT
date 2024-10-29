package com.epsi.workshop.goodMental.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Compte_Utilisateur")
public class CompteUtilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(nullable = false)
    private String motDePasseHash;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private LocalDate dateNaissance;

    @Column(nullable = false)
    private Date dateCreation;

    @Enumerated(EnumType.STRING)
    private StatutUtilisateur statut;

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getMotDePasseHash() {
		return motDePasseHash;
	}

	public void setMotDePasseHash(String motDePasseHash) {
		this.motDePasseHash = motDePasseHash;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(LocalDate dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date date) {
		this.dateCreation = date;
	}

	public StatutUtilisateur getStatut() {
		return statut;
	}

	public void setStatut(StatutUtilisateur statut) {
		this.statut = statut;
	}
	
	@Override
	public String toString() {
	    return "CompteUtilisateur{" +
	            "userId=" + userId +
	            ", nom='" + nom + '\'' +
	            ", prenom='" + prenom + '\'' +
	            ", email='" + email + '\'' +
	            ", dateNaissance=" + dateNaissance +
	            ", dateCreation=" + dateCreation +
	            ", statut=" + statut +
	            '}';
	}

}

