package com.assalaIskane.project.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Absence {
	@Id
	private int id;
	@ManyToOne
	@JoinColumn(name = "id_ouvrier")
	private Ouvrier ouvrier;
	private Date date_absence;
	@ManyToOne
	@JoinColumn(name = "id_chantier")
	private Chantier chantier;
	private int absent;
	
	public Absence(int id, Ouvrier ouvrier, Date date_absence, Chantier chantier, int absent) {
		super();
		this.id = id;
		this.ouvrier = ouvrier;
		this.date_absence = date_absence;
		this.chantier = chantier;
		this.absent = absent;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Ouvrier getOuvrier() {
		return ouvrier;
	}

	public void setOuvrier(Ouvrier ouvrier) {
		this.ouvrier = ouvrier;
	}

	public Date getDate_absence() {
		return date_absence;
	}

	public void setDate_absence(Date date_absence) {
		this.date_absence = date_absence;
	}

	public Chantier getChantier() {
		return chantier;
	}

	public void setChantier(Chantier chantier) {
		this.chantier = chantier;
	}

	public int getAbsent() {
		return absent;
	}

	public void setAbsent(int absent) {
		this.absent = absent;
	}

	@Override
	public String toString() {
		return "Absence [id=" + id + ", ouvrier=" + ouvrier + ", date_absence=" + date_absence + ", chantier="
				+ chantier + ", absent=" + absent + "]";
	}

}
