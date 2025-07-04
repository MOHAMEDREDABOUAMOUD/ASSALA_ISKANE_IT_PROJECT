package com.assalaIskane.project.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Rj_materiels_materiaux {
	@Id
	private int id;
	@ManyToOne
	@JoinColumn(name = "id_rj")
	private Rapport_jour rj;
	private String designation;
	private String unité;
	private int qte;
	
	public Rj_materiels_materiaux() {
		// TODO Auto-generated constructor stub
	}
	public Rj_materiels_materiaux(Rapport_jour rj, String designation, String unité, int qte) {
		super();
		this.rj = rj;
		this.designation = designation;
		this.unité = unité;
		this.qte = qte;
	}
	public Rapport_jour getRj() {
		return rj;
	}
	public void setRj(Rapport_jour rj) {
		this.rj = rj;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getUnité() {
		return unité;
	}
	public void setUnité(String unité) {
		this.unité = unité;
	}
	public int getQte() {
		return qte;
	}
	public void setQte(int qte) {
		this.qte = qte;
	}
	@Override
	public String toString() {
		return "Rj_materiels_materiaux [rj=" + rj + ", designation=" + designation + ", unité=" + unité + ", qte=" + qte
				+ "]";
	}
	
}
