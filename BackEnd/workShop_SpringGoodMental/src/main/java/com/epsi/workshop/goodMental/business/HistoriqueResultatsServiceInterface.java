package com.epsi.workshop.goodMental.business;

import java.util.Date;
import java.util.List;

import com.epsi.workshop.goodMental.models.HistoriqueResultats;
import com.epsi.workshop.goodMental.models.NiveauRisque;

public interface HistoriqueResultatsServiceInterface {
    void addResult(Integer userId, Date dateTest, Double scoreHad, String recommandations, NiveauRisque niveauRisque);
    List<HistoriqueResultats> getResultsForUser(Integer userId);
}

