package com.epsi.workshop.goodMental.business;

import java.util.List;

import com.epsi.workshop.goodMental.models.CompteUtilisateur;

public interface AccesPatientServiceInterface {
    void grantAccess(Integer adminId, Integer userId);
    void revokeAccess(Integer adminId, Integer userId);
    List<CompteUtilisateur> getAccessForAdmin(Integer adminId);
}
