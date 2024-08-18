package com.assalaIskane.project.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Stock {
	@Id
	private int id;
	private String gerant;
	private String numero;
	private String email;
	
	public Stock(int id, String gerant, String numero, String email) {
		super();
		this.id = id;
		this.gerant = gerant;
		this.numero = numero;
		this.email = email;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getGerant() {
		return gerant;
	}

	public void setGerant(String gerant) {
		this.gerant = gerant;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Stock [id=" + id + ", gerant=" + gerant + ", numero=" + numero + ", email=" + email + "]";
	}
	
}
