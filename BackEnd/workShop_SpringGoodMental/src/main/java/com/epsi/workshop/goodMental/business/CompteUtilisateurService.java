package com.epsi.workshop.goodMental.business;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epsi.workshop.goodMental.models.CompteUtilisateur;
import com.epsi.workshop.goodMental.models.StatutUtilisateur;
import com.epsi.workshop.goodMental.repositories.CompteUtilisateurRepository;


@Service
public class CompteUtilisateurService implements CompteUtilisateurServiceInterface {
    @Autowired
    private CompteUtilisateurRepository compteUtilisateurDao;

    @Override
    public void createUser(String motDePasseHash, String nom, String prenom, String email, Date dateNaissance) {
        CompteUtilisateur user = new CompteUtilisateur();
        user.setMotDePasseHash(motDePasseHash);
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setEmail(email);
        user.setDateCreation(new Date());
        user.setStatut(StatutUtilisateur.Actif);
        compteUtilisateurDao.save(user);
    }

    @Override
    public CompteUtilisateur getUser(Integer userId) {
        return compteUtilisateurDao.findById(userId).orElse(null);
    }

    @Override
    public List<CompteUtilisateur> getAllUsers() {
        return compteUtilisateurDao.findAll();
    }

    @Override
    public void updateUserStatus(Integer userId, StatutUtilisateur statut) {
        CompteUtilisateur user = compteUtilisateurDao.findById(userId).orElse(null);
        if (user != null) {
            user.setStatut(statut);
            compteUtilisateurDao.save(user);
        }
    }
}
