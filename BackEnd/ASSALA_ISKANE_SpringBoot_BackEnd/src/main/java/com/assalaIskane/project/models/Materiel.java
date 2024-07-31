package com.assalaIskane.project.models;

public class Materiel {
	private int id;
	private String nom;
	private int qte;
	private float prix;
	private Stock stock;
	
	public Materiel(int id, String nom, int qte, float prix, Stock stock) {
		super();
		this.id = id;
		this.nom = nom;
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
		return "Materiel [id=" + id + ", nom=" + nom + ", qte=" + qte + ", prix=" + prix + ", stock=" + stock + "]";
	}
	
}
