package com.assalaIskane.project.business;

import java.util.List;

import com.assalaIskane.project.models.Ouvrier;

public interface OuvrierServiceInterface {
	List<Ouvrier> getOuvriers(String id_projet);
}
