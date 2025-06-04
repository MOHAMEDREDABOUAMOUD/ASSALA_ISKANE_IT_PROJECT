package com.epsi.workshop.goodMental.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epsi.workshop.goodMental.models.AnnuairePraticiens;
import com.epsi.workshop.goodMental.repositories.AnnuairePraticiensRepository;

@Service
public class AnnuairePraticiensService implements AnnuairePraticiensServiceInterface {
    @Autowired
    private AnnuairePraticiensRepository annuairePraticiensDao;

    @Override
    public void addPraticien(String nom, String specialite, String adresse, String email, String telephone, String siteWeb) {
        AnnuairePraticiens praticien = new AnnuairePraticiens();
        praticien.setNom(nom);
        praticien.setSpecialite(specialite);
        praticien.setAdresse(adresse);
        praticien.setEmail(email);
        praticien.setTelephone(telephone);
        praticien.setSiteWeb(siteWeb);
        annuairePraticiensDao.save(praticien);
    }

    @Override
    public List<AnnuairePraticiens> getAllPraticiens() {
        return annuairePraticiensDao.findAll();
    }

    @Override
    public List<AnnuairePraticiens> getPraticiensBySpecialite(String specialite) {
        return annuairePraticiensDao.findBySpecialite(specialite);
    }
}
