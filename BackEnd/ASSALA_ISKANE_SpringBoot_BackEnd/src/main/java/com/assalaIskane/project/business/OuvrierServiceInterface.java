package com.assalaIskane.project.business;

import java.util.Date;
import java.util.List;

import com.assalaIskane.project.models.Ouvrier;

public interface OuvrierServiceInterface {
	List<Ouvrier> getOuvriers(String id_projet);
	void AddOuvrier(String id_ouvrier, String id_projet, String nom,String prenom, String numero);
	
}
