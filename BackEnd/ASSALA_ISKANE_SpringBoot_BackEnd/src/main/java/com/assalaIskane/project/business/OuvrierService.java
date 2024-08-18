package com.assalaIskane.project.business;

import java.util.List;

import org.springframework.stereotype.Service;

import com.assalaIskane.project.models.Ouvrier;
import com.assalaIskane.project.repositories.OuvrierRepository;

@Service
public class OuvrierService implements OuvrierServiceInterface{
	private OuvrierRepository ouvrierDao;
	
	public OuvrierService(OuvrierRepository ouvrierDao) {
		this.ouvrierDao = ouvrierDao;
	}
	
	@Override
	public List<Ouvrier> getOuvriers(String id_projet) {
		return ouvrierDao.getOuvriers(id_projet);
	}
}
