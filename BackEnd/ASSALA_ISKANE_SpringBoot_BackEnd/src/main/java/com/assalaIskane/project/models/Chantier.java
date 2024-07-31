package com.assalaIskane.project.models;

public class Chantier {
	private int id;
	private Projet projet;
	private User resp;
	
	public Chantier(int id, Projet projet, User resp) {
		super();
		this.id = id;
		this.projet = projet;
		this.resp = resp;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Projet getProjet() {
		return projet;
	}
	public void setProjet(Projet projet) {
		this.projet = projet;
	}
	public User getResp() {
		return resp;
	}
	public void setResp(User resp) {
		this.resp = resp;
	}
	@Override
	public String toString() {
		return "Chantier [id=" + id + ", projet=" + projet + ", resp=" + resp + "]";
	}
	
}
