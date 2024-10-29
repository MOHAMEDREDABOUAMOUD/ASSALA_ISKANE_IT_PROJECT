package com.epsi.workshop.goodMental.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Chat")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chatId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private CompteUtilisateur utilisateur;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private CompteAdmin admin;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private LocalDateTime dateMessage;

    @Column(nullable = false)
    private Boolean lu;

	public Integer getChatId() {
		return chatId;
	}

	public void setChatId(Integer chatId) {
		this.chatId = chatId;
	}

	public CompteUtilisateur getUtilisateur() {
		return utilisateur;
	}

	public void setUtilisateur(CompteUtilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}

	public CompteAdmin getAdmin() {
		return admin;
	}

	public void setAdmin(CompteAdmin admin) {
		this.admin = admin;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getDateMessage() {
		return dateMessage;
	}

	public void setDateMessage(LocalDateTime dateMessage) {
		this.dateMessage = dateMessage;
	}

	public Boolean getLu() {
		return lu;
	}

	public void setLu(Boolean lu) {
		this.lu = lu;
	}
    
}