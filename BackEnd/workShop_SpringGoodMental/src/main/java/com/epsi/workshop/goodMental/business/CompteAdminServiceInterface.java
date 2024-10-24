package com.epsi.workshop.goodMental.business;

import java.util.List;

import com.epsi.workshop.goodMental.models.CompteAdmin;

public interface CompteAdminServiceInterface {
    void createAdmin(String motDePasseHash, String nom, String prenom, String email, String role);
    CompteAdmin getAdmin(Integer adminId);
    List<CompteAdmin> getAllAdmins();
}