package com.epsi.workshop.goodMental.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epsi.workshop.goodMental.business.QuestionnaireService;
import com.epsi.workshop.goodMental.models.Questionnaire;

@RestController
@RequestMapping("/api/questionnaire")
public class QuestionnaireController {
    @Autowired
    private QuestionnaireService service;

    @PostMapping("/addQuestion")
    public void addQuestion(@RequestParam String intituleQuestion, @RequestParam String categorie, 
                            @RequestParam String optionsReponses, @RequestParam Double ponderation) {
        service.addQuestion(intituleQuestion, categorie, optionsReponses, ponderation);
    }

    @GetMapping("/getAllQuestions")
    public List<Questionnaire> getAllQuestions() {
        return service.getAllQuestions();
    }
}
