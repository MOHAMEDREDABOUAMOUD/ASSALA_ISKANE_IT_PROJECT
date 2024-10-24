package com.epsi.workshop.goodMental.business;

import java.util.*;
import java.util.List;

import com.epsi.workshop.goodMental.models.CompteUtilisateur;
import com.epsi.workshop.goodMental.models.StatutUtilisateur;

public interface CompteUtilisateurServiceInterface {
    void createUser(String motDePasseHash, String nom, String prenom, String email, Date dateNaissance);
    CompteUtilisateur getUser(Integer userId);
    List<CompteUtilisateur> getAllUsers();
    void updateUserStatus(Integer userId, StatutUtilisateur statut);
}
