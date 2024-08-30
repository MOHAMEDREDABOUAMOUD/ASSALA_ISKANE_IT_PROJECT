package com.assalaIskane.project.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.assalaIskane.project.business.OuvrierServiceInterface;
import com.assalaIskane.project.models.Ouvrier;
import com.assalaIskane.project.models.User;

@RestController
public class OuvrierController {
	@Autowired
	private OuvrierServiceInterface service;
	
	@GetMapping("/getOuvriers")
	public List<Ouvrier> getOuvriers(@RequestParam String id_projet){
		return service.getOuvriers(id_projet);
	}
	
	@PostMapping("/AddOuvrier")
	void AddOuvrier(@RequestParam String id,@RequestParam String id_projet,@RequestParam String nom,@RequestParam String prenom,@RequestParam String numero){
		service.AddOuvrier(id,id_projet,nom, prenom, numero);
	}
}
