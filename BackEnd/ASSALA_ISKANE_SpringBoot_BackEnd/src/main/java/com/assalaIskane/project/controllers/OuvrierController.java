package com.assalaIskane.project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assalaIskane.project.business.OuvrierServiceInterface;
import com.assalaIskane.project.models.Ouvrier;

@RestController
public class OuvrierController {
	@Autowired
	private OuvrierServiceInterface service;
	
	@GetMapping("/getOuvriers")
	public List<Ouvrier> getOuvriers(@RequestParam String id_projet){
		return service.getOuvriers(id_projet);
	}
}
