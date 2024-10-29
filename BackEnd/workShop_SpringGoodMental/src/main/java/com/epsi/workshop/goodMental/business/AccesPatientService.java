package com.epsi.workshop.goodMental.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.epsi.workshop.goodMental.models.AccesPatient;
import com.epsi.workshop.goodMental.models.AccesPatientId;
import com.epsi.workshop.goodMental.models.CompteUtilisateur;
import com.epsi.workshop.goodMental.repositories.AccesPatientRepository;
import com.epsi.workshop.goodMental.repositories.CompteAdminRepository;
import com.epsi.workshop.goodMental.repositories.CompteUtilisateurRepository;

@Service
public class AccesPatientService implements AccesPatientServiceInterface {
    @Autowired
    @Qualifier("accesPatientRepository") // Spécifie le bean que vous voulez injecte
    private AccesPatientRepository accesPatientDao;
    @Autowired
    private CompteAdminRepository compteAdminDao;
    @Autowired
    private CompteUtilisateurRepository compteUtilisateurDao;

    @Override
    public void grantAccess(Integer adminId, Integer userId) {
        AccesPatient accesPatient = new AccesPatient();
        accesPatient.setId(new AccesPatientId(adminId, userId));
        accesPatient.setAdmin(compteAdminDao.findById(adminId).orElse(null));
        accesPatient.setUtilisateur(compteUtilisateurDao.findById(userId).orElse(null));
        accesPatientDao.save(accesPatient);
    }

    @Override
    public void revokeAccess(Integer adminId, Integer userId) {
        AccesPatientId id = new AccesPatientId(adminId, userId);
        accesPatientDao.deleteById(id);
    }

	@Override
	public List<CompteUtilisateur> getAccessForAdmin(Integer adminId) {
		// TODO Auto-generated method stub
		return null;
	}

}

