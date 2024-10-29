package com.epsi.workshop.goodMental.business;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epsi.workshop.goodMental.models.CompteAdmin;
import com.epsi.workshop.goodMental.repositories.CompteAdminRepository;

@Service
public class CompteAdminService implements CompteAdminServiceInterface {
    @Autowired
    private CompteAdminRepository compteAdminDao;

    @Override
    public void createAdmin(String motDePasseHash, String nom, String prenom, String email, String role) {
        CompteAdmin admin = new CompteAdmin();
        admin.setMotDePasseHash(motDePasseHash);
        admin.setNom(nom);
        admin.setPrenom(prenom);
        admin.setEmail(email);
        admin.setRole(role);
        compteAdminDao.save(admin);
    }

    @Override
    public CompteAdmin getAdmin(Integer adminId) {
        return compteAdminDao.findById(adminId).orElse(null);
    }

    @Override
    public List<CompteAdmin> getAllAdmins() {
        return compteAdminDao.findAll();
    }
}