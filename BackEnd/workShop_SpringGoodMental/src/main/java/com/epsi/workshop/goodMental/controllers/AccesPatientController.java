package com.epsi.workshop.goodMental.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epsi.workshop.goodMental.business.AccesPatientService;
import com.epsi.workshop.goodMental.models.CompteUtilisateur;

@RestController
@RequestMapping("/api/acces")
public class AccesPatientController {
    @Autowired
    private AccesPatientService service;

    @PostMapping("/grantAccess")
    public void grantAccess(@RequestParam Integer adminId, @RequestParam Integer userId) {
        service.grantAccess(adminId, userId);
    }

    @PostMapping("/revokeAccess")
    public void revokeAccess(@RequestParam Integer adminId, @RequestParam Integer userId) {
        service.revokeAccess(adminId, userId);
    }

    @GetMapping("/getAccessForAdmin")
    public List<CompteUtilisateur> getAccessForAdmin(@RequestParam Integer adminId) {
        return service.getAccessForAdmin(adminId);
    }
}