package com.epsi.workshop.goodMental.business;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epsi.workshop.goodMental.models.HistoriqueResultats;
import com.epsi.workshop.goodMental.models.NiveauRisque;
import com.epsi.workshop.goodMental.repositories.CompteUtilisateurRepository;
import com.epsi.workshop.goodMental.repositories.HistoriqueResultatsRepository;

@Service
public class HistoriqueResultatsService implements HistoriqueResultatsServiceInterface {
    @Autowired
    private HistoriqueResultatsRepository historiqueResultatsDao;
    @Autowired
    private CompteUtilisateurRepository compteUtilisateurDao;

   

    @Override
    public List<HistoriqueResultats> getResultsForUser(Integer userId) {
        return historiqueResultatsDao.findByUtilisateur_UserId(userId);
    }

	@Override
	public void addResult(Integer userId, Date dateTest, Double scoreHad, String recommandations,
			NiveauRisque niveauRisque) {
		// TODO Auto-generated method stub
		
	}
}
