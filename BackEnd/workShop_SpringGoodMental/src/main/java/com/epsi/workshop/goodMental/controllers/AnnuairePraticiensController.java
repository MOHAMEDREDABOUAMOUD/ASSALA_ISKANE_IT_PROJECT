package com.epsi.workshop.goodMental.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epsi.workshop.goodMental.business.AnnuairePraticiensService;
import com.epsi.workshop.goodMental.models.AnnuairePraticiens;

@RestController
@RequestMapping("/api/praticiens")
public class AnnuairePraticiensController {
    @Autowired
    private AnnuairePraticiensService service;

    @PostMapping("/addPraticien")
    public void addPraticien(@RequestParam String nom, @RequestParam String specialite, 
                             @RequestParam String adresse, @RequestParam String email, 
                             @RequestParam String telephone, @RequestParam String siteWeb) {
        service.addPraticien(nom, specialite, adresse, email, telephone, siteWeb);
    }

    @GetMapping("/getAllPraticiens")
    public List<AnnuairePraticiens> getAllPraticiens() {
        return service.getAllPraticiens();
    }

    @GetMapping("/getPraticiensBySpecialite")
    public List<AnnuairePraticiens> getPraticiensBySpecialite(@RequestParam String specialite) {
        return service.getPraticiensBySpecialite(specialite);
    }
}