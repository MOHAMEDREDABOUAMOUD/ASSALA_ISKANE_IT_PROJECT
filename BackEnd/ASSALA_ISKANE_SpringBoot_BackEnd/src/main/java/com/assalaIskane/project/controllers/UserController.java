package com.assalaIskane.project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@GetMapping("/test")
	public String test(@RequestParam String param){
		return "test passed succesfully : " + param;
	}
	
	@GetMapping("/authenticate")
	public User authenticate(@RequestParam String id, @RequestParam String pass){
		System.out.println("id : "+id+", pass : "+pass);
		return service.getUserByIdAndPass(id, pass);
	}
	
	@PostMapping("/AddUser")
	public void AddUser(@RequestParam String id, @RequestParam String nom, @RequestParam String prenom, @RequestParam String fonction, @RequestParam String numero, @RequestParam String pass) {
		service.addUser(new User(id, nom, prenom, fonction, numero, pass));
	}

	@PostMapping("/UpdateUser")
	public void UpdateUser(@RequestParam String id, @RequestParam String nom, @RequestParam String prenom, @RequestParam String fonction, @RequestParam String numero, @RequestParam String pass) {
		service.updateUser(id, nom, prenom, fonction, numero, pass);
	}
}
