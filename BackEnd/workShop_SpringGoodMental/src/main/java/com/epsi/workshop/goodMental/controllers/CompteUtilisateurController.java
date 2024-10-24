package com.epsi.workshop.goodMental.controllers;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.epsi.workshop.goodMental.business.CompteUtilisateurService;
import com.epsi.workshop.goodMental.models.CompteUtilisateur;
import com.epsi.workshop.goodMental.models.StatutUtilisateur;


@RestController
@RequestMapping("/api")
public class CompteUtilisateurController {
    @Autowired
    private CompteUtilisateurService service;

    @PostMapping("/createUser")
    public void createUser(@RequestParam String motDePasseHash, @RequestParam String nom, 
                           @RequestParam String prenom, @RequestParam String email, 
                           @RequestParam String dateNaissance) throws java.text.ParseException {
        service.createUser(motDePasseHash, nom, prenom, email, 
                           new SimpleDateFormat("yyyy-MM-dd").parse(dateNaissance));
    }

    @GetMapping("/getUser")
    public CompteUtilisateur getUser(@RequestParam Integer userId) {
        return service.getUser(userId);
    }

    @GetMapping("/getAllUsers")
    public List<CompteUtilisateur> getAllUsers() {
        return service.getAllUsers();
    }

    @PostMapping("/updateUserStatus")
    public void updateUserStatus(@RequestParam Integer userId, @RequestParam StatutUtilisateur statut) {
        service.updateUserStatus(userId, statut);
    }
}