package com.epsi.workshop.goodMental.business;

import java.util.List;

import com.epsi.workshop.goodMental.models.AnnuairePraticiens;

public interface AnnuairePraticiensServiceInterface {
    void addPraticien(String nom, String specialite, String adresse, String email, String telephone, String siteWeb);
    List<AnnuairePraticiens> getAllPraticiens();
    List<AnnuairePraticiens> getPraticiensBySpecialite(String specialite);
}