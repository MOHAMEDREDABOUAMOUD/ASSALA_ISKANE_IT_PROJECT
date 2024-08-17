package com.assalaIskane.project.models;

import java.util.Base64;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Photo_rjtr {
	@ManyToOne
	@JoinColumn(name = "id_rj_tr")
	private Rj_travaux_realiser rjtr;
	private Base64 photo;
	
	public Rj_travaux_realiser getRjtr() {
		return rjtr;
	}

	public void setRjtr(Rj_travaux_realiser rjtr) {
		this.rjtr = rjtr;
	}

	public Base64 getPhoto() {
		return photo;
	}

	public void setPhoto(Base64 photo) {
		this.photo = photo;
	}

	public Photo_rjtr(Rj_travaux_realiser rjtr, Base64 photo) {
		super();
		this.rjtr = rjtr;
		this.photo = photo;
	}

	@Override
	public String toString() {
		return "Photo_rjtr [rjtr=" + rjtr + ", photo=" + photo + "]";
	}
}
