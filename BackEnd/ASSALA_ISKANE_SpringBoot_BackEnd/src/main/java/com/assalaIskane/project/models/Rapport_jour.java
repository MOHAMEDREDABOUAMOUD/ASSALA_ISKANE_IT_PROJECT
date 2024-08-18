package com.assalaIskane.project.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Rapport_jour {
	@Id
	private int id;
	private Date date_rj;
	private String temperature;
	private String pluie;
	private String vent;
	private String remarque;
	@ManyToOne
	@JoinColumn(name = "id_chantier")
	private Chantier chantier;
	public Rapport_jour(int id, Date date_rj, String temperature, String pluie, String vent, String remarque,
			Chantier chantier) {
		super();
		this.id = id;
		this.date_rj = date_rj;
		this.temperature = temperature;
		this.pluie = pluie;
		this.vent = vent;
		this.remarque = remarque;
		this.chantier = chantier;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getDate_rj() {
		return date_rj;
	}
	public void setDate_rj(Date date_rj) {
		this.date_rj = date_rj;
	}
	public String getTemperature() {
		return temperature;
	}
	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}
	public String getPluie() {
		return pluie;
	}
	public void setPluie(String pluie) {
		this.pluie = pluie;
	}
	public String getVent() {
		return vent;
	}
	public void setVent(String vent) {
		this.vent = vent;
	}
	public String getRemarque() {
		return remarque;
	}
	public void setRemarque(String remarque) {
		this.remarque = remarque;
	}
	public Chantier getChantier() {
		return chantier;
	}
	public void setChantier(Chantier chantier) {
		this.chantier = chantier;
	}
	@Override
	public String toString() {
		return "Rapport_jour [id=" + id + ", date_rj=" + date_rj + ", temperature=" + temperature + ", pluie=" + pluie
				+ ", vent=" + vent + ", remarque=" + remarque + ", chantier=" + chantier + "]";
	}
	

}
