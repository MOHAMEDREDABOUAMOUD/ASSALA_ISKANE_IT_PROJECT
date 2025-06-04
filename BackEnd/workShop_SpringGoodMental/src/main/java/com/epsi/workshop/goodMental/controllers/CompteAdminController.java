package com.epsi.workshop.goodMental.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epsi.workshop.goodMental.business.CompteAdminService;
import com.epsi.workshop.goodMental.models.CompteAdmin;

@RestController
@RequestMapping("/api/admin")
public class CompteAdminController {
    @Autowired
    private CompteAdminService service;

    @PostMapping("/createAdmin")
    public void createAdmin(@RequestParam String motDePasseHash, @RequestParam String nom, 
                            @RequestParam String prenom, @RequestParam String email, 
                            @RequestParam String role) {
        service.createAdmin(motDePasseHash, nom, prenom, email, role);
    }

    @GetMapping("/getAdmin")
    public CompteAdmin getAdmin(@RequestParam Integer adminId) {
        return service.getAdmin(adminId);
    }

    @GetMapping("/getAllAdmins")
    public List<CompteAdmin> getAllAdmins() {
        return service.getAllAdmins();
    }
}