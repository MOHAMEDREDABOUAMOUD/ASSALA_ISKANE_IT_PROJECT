package com.assalaIskane.project.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Materiaux {
	@Id
	private int id;
	private String nom;
	private String type;
	private int qte;
	private float prix;
	@ManyToOne
	@JoinColumn(name = "id_stock")
	private Stock stock;
	
	public Materiaux(int id, String nom, String type, int qte, float prix, Stock stock) {
		super();
		this.id = id;
		this.nom = nom;
		this.type = type;
		this.qte = qte;
		this.prix = prix;
		this.stock = stock;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getQte() {
		return qte;
	}

	public void setQte(int qte) {
		this.qte = qte;
	}

	public float getPrix() {
		return prix;
	}

	public void setPrix(float prix) {
		this.prix = prix;
	}

	public Stock getStock() {
		return stock;
	}

	public void setStock(Stock stock) {
		this.stock = stock;
	}

	@Override
	public String toString() {
		return "Materiaux [id=" + id + ", nom=" + nom + ", type=" + type + ", qte=" + qte + ", prix=" + prix
				+ ", stock=" + stock + "]";
	}

}
