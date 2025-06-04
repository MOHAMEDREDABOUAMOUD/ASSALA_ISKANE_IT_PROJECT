package com.assalaIskane.project.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Photo_rjtr {
	@Id
	private int id;
	@ManyToOne
	@JoinColumn(name = "id_rj_tr")
	private Rj_travaux_realiser rjtr;
	private byte[] photo;
	
	public Photo_rjtr() {
		// TODO Auto-generated constructor stub
	}
	public Rj_travaux_realiser getRjtr() {
		return rjtr;
	}

	public void setRjtr(Rj_travaux_realiser rjtr) {
		this.rjtr = rjtr;
	}

	public byte[] getPhoto() {
		return photo;
	}

	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}

	public Photo_rjtr(Rj_travaux_realiser rjtr, byte[] photo) {
		super();
		this.rjtr = rjtr;
		this.photo = photo;
	}

	@Override
	public String toString() {
		return "Photo_rjtr [rjtr=" + rjtr + ", photo=" + photo + "]";
	}
}
