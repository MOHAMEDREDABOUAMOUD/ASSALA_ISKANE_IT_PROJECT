package com.assalaIskane.project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assalaIskane.project.business.UserServiceInterface;
import com.assalaIskane.project.models.User;

@RestController
public class UserController {
	@Autowired
	private UserServiceInterface service;
	
	public UserController(UserServiceInterface service) {
		super();
		this.service = service;
	}
	
	@GetMapping("/authenticate/{id}/{pass}")
	public User getCompaniesByName(@PathVariable String id, @PathVariable String pass){
		return service.getUserByIdAndPass(id, pass);
	}
	
	@PostMapping("/AddUser/{id}/{nom}/{prenom}/{fonction}/{numero}/{pass}")
	public void AddUser(@PathVariable String id, @PathVariable String nom, @PathVariable String prenom, @PathVariable String fonction, @PathVariable String numero, @PathVariable String pass) {
		service.addUser(new User(id, nom, prenom, fonction, numero, pass));
	}

	@PostMapping("/UpdateUser/{id}/{nom}/{prenom}/{fonction}/{numero}/{pass}")
	public void UpdateUser(@PathVariable String id, @PathVariable String nom, @PathVariable String prenom, @PathVariable String fonction, @PathVariable String numero, @PathVariable String pass) {
		service.updateUser(id, nom, prenom, fonction, numero, pass);
	}
}
