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
	@ManyToOne
	@JoinColumn(name = "valide_par")
	private User valide_par;
	
	public Absence() {
		// TODO Auto-generated constructor stub
	}
	
	public Absence(int id, Ouvrier ouvrier, Date date_absence, Chantier chantier, int absent, User valide_par) {
		super();
		this.id = id;
		this.ouvrier = ouvrier;
		this.date_absence = date_absence;
		this.chantier = chantier;
		this.absent = absent;
		this.valide_par = valide_par;
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

	public User getValide_par() {
		return valide_par;
	}

	public void setValide_par(User valide_par) {
		this.valide_par = valide_par;
	}

	@Override
	public String toString() {
		return "Absence [id=" + id + ", ouvrier=" + ouvrier + ", date_absence=" + date_absence + ", chantier="
				+ chantier + ", absent=" + absent + ", valide_par=" + valide_par + "]";
	}

}
