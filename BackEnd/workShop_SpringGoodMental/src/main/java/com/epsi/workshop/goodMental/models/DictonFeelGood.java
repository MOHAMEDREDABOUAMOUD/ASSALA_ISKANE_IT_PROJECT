package com.epsi.workshop.goodMental.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Dicton_Feel_Good")
public class DictonFeelGood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer dictonId;

    @Column(nullable = false)
    private String texteDicton;

    private String auteur;

	public Integer getDictonId() {
		return dictonId;
	}

	public void setDictonId(Integer dictonId) {
		this.dictonId = dictonId;
	}

	public String getTexteDicton() {
		return texteDicton;
	}

	public void setTexteDicton(String texteDicton) {
		this.texteDicton = texteDicton;
	}

	public String getAuteur() {
		return auteur;
	}

	public void setAuteur(String auteur) {
		this.auteur = auteur;
	}
    
   
}
