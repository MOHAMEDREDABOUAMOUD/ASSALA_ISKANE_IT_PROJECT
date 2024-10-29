package com.epsi.workshop.goodMental.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epsi.workshop.goodMental.business.HistoriqueResultatsService;
import com.epsi.workshop.goodMental.models.HistoriqueResultats;
import com.epsi.workshop.goodMental.models.NiveauRisque;

@RestController
@RequestMapping("/api/resultats")
public class HistoriqueResultatsController {
    @Autowired
    private HistoriqueResultatsService service;

    @PostMapping("/addResult")
    public void addResult(@RequestParam Integer userId, @RequestParam String dateTest, 
                          @RequestParam Double scoreHad, @RequestParam String recommandations, 
                          @RequestParam NiveauRisque niveauRisque) throws ParseException {
        service.addResult(userId, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(dateTest), 
                          scoreHad, recommandations, niveauRisque);
    }

    @GetMapping("/getResultsForUser")
    public List<HistoriqueResultats> getResultsForUser(@RequestParam Integer userId) {
        return service.getResultsForUser(userId);
    }
}