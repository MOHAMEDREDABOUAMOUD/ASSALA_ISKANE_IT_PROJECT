package com.assalaIskane.project.models;

public class Rj_travaux_realiser {
	private int id;
	private Rapport_jour rj;
	private String description;
	public Rj_travaux_realiser(int id, Rapport_jour rj, String description) {
		super();
		this.id = id;
		this.rj = rj;
		this.description = description;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Rapport_jour getRj() {
		return rj;
	}
	public void setRj(Rapport_jour rj) {
		this.rj = rj;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String toString() {
		return "Rj_travaux_realiser [id=" + id + ", rj=" + rj + ", description=" + description + "]";
	}
	
}
