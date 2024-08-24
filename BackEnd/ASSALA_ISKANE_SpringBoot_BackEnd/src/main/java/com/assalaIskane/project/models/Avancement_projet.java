package com.assalaIskane.project.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Avancement_projet {
	@Id
	private int id;
	private Date date_rapport;
	@ManyToOne
	@JoinColumn(name = "id_projet")
	private Projet projet;
	
	public Avancement_projet() {
		// TODO Auto-generated constructor stub
	}
	public Avancement_projet(int id, Date date_rapport, Projet projet) {
		super();
		this.id = id;
		this.date_rapport = date_rapport;
		this.projet = projet;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getDate_rapport() {
		return date_rapport;
	}
	public void setDate_rapport(Date date_rapport) {
		this.date_rapport = date_rapport;
	}
	public Projet getProjet() {
		return projet;
	}
	public void setProjet(Projet projet) {
		this.projet = projet;
	}
	@Override
	public String toString() {
		return "Avancement_projet [id=" + id + ", date_rapport=" + date_rapport + ", projet=" + projet + "]";
	}
	
}
